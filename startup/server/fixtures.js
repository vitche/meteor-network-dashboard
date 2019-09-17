import { Meteor } from 'meteor/meteor';

import { GroupsCollection } from '../../modules/groups/server/groups.schema';
import { UsersCollection } from '../../modules/users/server/users.schema'
import { UsersMethods } from '../../modules/users/server/users.methods';

const GROUP_DEFAULT = require('../../configs/default-data/groups.config');
const USERS_DEFAULT = require('../../configs/default-data/users.config');

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

		UsersMethods.setUserWithDefaultSettings.call({ userId: devopsId, user: USERS_DEFAULT.devops });

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

		UsersMethods.sendEnrollmentLetter.call({ userId: devopsId, email: USERS_DEFAULT.devops.email });

	} catch (e) {
		throw new Meteor.Error(e);
	}
});


