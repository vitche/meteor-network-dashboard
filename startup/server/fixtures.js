import { Meteor } from 'meteor/meteor';

import { Groups } from '../../modules/groups/server/groups.schema';
import { Organizations } from '../../modules/organizations/server/organizations.schema';
import { UsersMethods } from '../../modules/users/server/users.methods';


const ORGANIZATION_DEFAULT = require('../../configs/default-data/organization.config');
const GROUP_DEFAULT = require('../../configs/default-data/groups.config');
const USERS_DEFAULT = require('../../configs/default-data/users.config');

Meteor.startup(() => {
	const organizations = Organizations.find({}).count();
	if (organizations) {
		return;
	}

	try {
		const organizationId = Organizations.insert(ORGANIZATION_DEFAULT);
		const groupId = Groups.insert({ ...GROUP_DEFAULT, ...{ organizationId } });

		USERS_DEFAULT.forEach((user) => {
			const userId = Accounts.createUser({ email: user.email });

			UsersMethods.setUserWithDefaultSettings.call({ userId, user, organizationId });

			UsersMethods.addPermissionToUser.call({
				userId,
				permissions: GROUP_DEFAULT.permissions,
				groupId
			});

			UsersMethods.sendEnrollmentLetter.call({ userId, email: user.email });
		})
	} catch (e) {
		throw new Meteor.Error(e);
	}
});


