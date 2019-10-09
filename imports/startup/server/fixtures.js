import { Meteor } from 'meteor/meteor';

import { GroupsCollection } from '../../modules/groups/both/groups.schema';
import { OrganizationsCollection } from '../../modules/organizations/both/organizations.schema';
import { UsersCollection } from '../../modules/users/both/users.schema'
import { UsersMethods } from '../../modules/users/both/users.methods';

const GROUP_DEFAULT = require('../../configs/default-data/groups.config');
const USERS_DEFAULT = require('../../configs/default-data/users.config');
const ORGANIZATION_DEFAULT = require('../../configs/default-data/organization.config');

Meteor.startup(() => {
	const users = UsersCollection.find({}).count();
	if (users) {
		return;
	}

	try {
		// create main admin of system
		const devopsId = Accounts.createUser({ email: USERS_DEFAULT.devops.email });

		// create default groups
		const rootGroupId = GroupsCollection.insert({ ...GROUP_DEFAULT.rootGroup });
		const allUsersGroupId = GroupsCollection.insert({ ...GROUP_DEFAULT.allUsers, parentGroupId: rootGroupId });

		const defaultOrganizationId = OrganizationsCollection.insert({
			...ORGANIZATION_DEFAULT,
			ownerId: devopsId,
			groupId: rootGroupId
		});

		// join group to organization
		GroupsCollection.update({ _id: rootGroupId }, { $set: { organizationId: defaultOrganizationId } });
		GroupsCollection.update({ _id: allUsersGroupId }, { $set: { organizationId: defaultOrganizationId } });

		UsersMethods.setUserWithDefaultSettings.call({
			userId: devopsId,
			user: USERS_DEFAULT.devops,
			organizationId: defaultOrganizationId
		});

		UsersMethods.addPermissionToUser.call({
			userId: devopsId,
			permissions: GROUP_DEFAULT.rootGroup.permissions,
			groupId: rootGroupId
		});

		UsersMethods.addPermissionToUser.call({
			userId: devopsId,
			permissions: GROUP_DEFAULT.allUsers.permissions,
			groupId: allUsersGroupId
		});

		UsersMethods.sendEnrollmentLetter({ userId: devopsId });

	} catch (e) {
		throw new Meteor.Error(e);
	}
});


