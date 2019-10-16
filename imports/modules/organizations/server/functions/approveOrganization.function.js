import { Meteor } from 'meteor/meteor';
import { GROUP_ALIASES } from '../../../../configs/groups/aliases';
import { GROUP_TITLES } from '../../../../configs/groups/titles';
import { ROLES_DICTIONARY } from '../../../../configs/roles/roles.dictionary';
import { GroupsCollection } from '../../../groups/both/groups.schema';
import { RolesService } from '../../../roles/server/services/roles.service';
import { UsersCollection } from '../../../users/both/users.schema';
import { OrganizationsCollection } from '../../both/organizations.schema';


export const approveOrganization = async function (organizationId, ownerId, groupTitle) {
	// TODO: make it as transaction flow
	try {
		const rootGroup = await GroupsCollection.findOne({ alias: GROUP_ALIASES.rootGroupAlias });

		// create root group of organization with provided title
		const organizationGroupId = await GroupsCollection.insert({
			title: groupTitle,
			alias: GROUP_ALIASES.organizationRootGroupAlias,
			organizationId: organizationId,
			parentGroupId: rootGroup._id,
			permissions: [ ROLES_DICTIONARY.private.organizationOwner.alias ]
		});

		// create a default group with all members of organization
		const membersGroupId = await GroupsCollection.insert({
			title: GROUP_TITLES.organizationMembersGroupTitle,
			alias: GROUP_ALIASES.organizationMembersGroupAlias,
			organizationId: organizationId,
			parentGroupId: organizationGroupId,
			permissions: [ ROLES_DICTIONARY.private.organizationMember.alias ]
		});

		// set root group id to organization document
		const updatedOrganization = await OrganizationsCollection.update(organizationId, {
			$set: {
				groupId: organizationGroupId,
				verified: true,
			}
		});

		const updatedUser = await UsersCollection.update(ownerId, {
			$set: {
				'profile.organizationId': organizationId,
			}
		});

		await RolesService.setUserPermissions(
			ownerId,
			[ ROLES_DICTIONARY.private.organizationOwner.alias ],
			organizationGroupId
		);
		await RolesService.setUserPermissions(
			ownerId,
			[ ROLES_DICTIONARY.private.organizationMember.alias ],
			membersGroupId
		);

	} catch (err) {
		console.error('approveOrganization: ', err);
		throw new Meteor.Error('approve-organization-error', err.message)
	}
	return true;
};