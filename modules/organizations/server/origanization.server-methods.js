import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { ROLES_DICTIONARY } from '../../../configs/roles/roles.dictionary';
import { Mixins } from '../../../helpers/server/mixins';
import { GroupsCollection } from '../../groups/both/groups.schema';
import { UsersCollection } from '../../users/users.schema';
import { OrganizationsCollection } from '../both/organizations.schema';
import { RolesHelpers } from '../../roles/server/helpers/roles.helpers';
import { UsersMethods } from '../../users/users.methods';

const DEFAULT_GROUPS = require('../../../configs/default-data/groups.config');

export const getOrganizationById = new ValidatedMethod({
	name: 'organization.getOrganizationById',
	mixins: [ Mixins.loggedIn, Mixins.roles ],
	roles: [
		ROLES_DICTIONARY.private.superAdmin.alias,
		ROLES_DICTIONARY.private.organizationOwner.alias,
		ROLES_DICTIONARY.private.organizationMember.alias
	],
	validate: new SimpleSchema({
		organizationId: { type: String }
	}).validator(),
	async run({ organizationId }) {
		let result;
		try {
			// TODO: make middleware for getting different set of data depending of the roles
			if (RolesHelpers.isHasPermission([ ROLES_DICTIONARY.private.organizationMember.alias ])) {
				result = await OrganizationsCollection.findOne({ _id: organizationId }, { title: 1 });
			} else {
				// For now return whole organization for SuperAdmin and Organization Owner
				// In future we can provide some additional information about organization (amount groups, users, peers, etc)
				result = await OrganizationsCollection.findOne({ _id: organizationId });
			}
		} catch (err) {
			throw new Meteor.Error(err.message, 'Something goes wrong')
		}
		return result
	}
});

export const createOrganizationRequest = new ValidatedMethod({
	name: 'organization.createOrganizationRequest',
	mixin: [ Mixins.loggedIn, Mixins.roles ],
	roles: [
		ROLES_DICTIONARY.private.defaultUser.alias
	],
	validate: new SimpleSchema({
		title: { type: String }
	}).validator(),
	async run({ title }) {
		const userId = Meteor.userId();
		let result;
		// create organization;
		try {
			result = await OrganizationsCollection.insert({ title, ownerId: userId });
		} catch (err) {
			console.log(err);
		}

		return result;

	}
});

export const approveOrganization = new ValidatedMethod({
	name: 'organization.method.approveOrganization',
	mixin: [ Mixins.loggedIn, Mixins.roles ],
	roles: [
		ROLES_DICTIONARY.private.superAdmin.alias,
	],
	validate: new SimpleSchema({
		organizationId: { type: String },
		ownerId: { type: String },
		groupTitle: { type: String }
	}).validator(),
	async run({ organizationId, ownerId, groupTitle }) {
		// TODO: make it as transaction flow
		try {
			const rootGroup = await GroupsCollection.findOne({ alias: DEFAULT_GROUPS.rootGroup.alias });

			const groupId = await GroupsCollection.insert({
				title: groupTitle,
				organizationId: organizationId,
				parentGroupId: rootGroup._id,
				permissions: [ ROLES_DICTIONARY.private.organizationOwner.alias ]
			});

			const updatedOrganization = await OrganizationsCollection.update(organizationId, {
				$set: {
					groupId: groupId,
					verified: true,
				}
			});

			const updatedUser = await UsersCollection.update(ownerId, {
				$set: {
					'profile.organizationId': organizationId,
				}
			});

			UsersMethods.addPermissionToUser.call({
				userId: ownerId,
				permissions: [ ROLES_DICTIONARY.private.organizationOwner.alias ],
				groupId
			});
		} catch (err) {
			console.log(err);
			throw new Meteor.Error('operation-fail', err.message)
		}
		return true;
	}
});