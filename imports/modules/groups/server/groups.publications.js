import { Meteor } from 'meteor/meteor'
import { GroupsCollection } from '../both/groups.schema';
import { SERVER_SESSIONS_KEYS } from '../../../configs/server-session.keys';
import * as _ from 'lodash';
import { ROLES_DICTIONARY } from '../../../configs/roles/roles.dictionary';
import { RolesHelpers } from '../../roles/server/helpers/roles.helpers';

const DEFAULT_GROUPS = require('../../../configs/default-data/groups.config');

function checkUserPermissions(neededRoles) {
	const currentUserPermissions = ServerSession.get(SERVER_SESSIONS_KEYS.userPermissions);
	return !!_.intersection(currentUserPermissions, neededRoles).length
}


Meteor.publish('groups.publish.getGroupList', function () {
	const userId = this.userId;
	if (!userId) {
		throw Meteor.Error('User must be logged in');
	}

	const requiredPermissions = [
		ROLES_DICTIONARY.private.superAdmin.alias,
		ROLES_DICTIONARY.private.organizationOwner.alias,
		ROLES_DICTIONARY.public.allowReviewGroup.alias
	];

	if (!checkUserPermissions(requiredPermissions)) {
		this.ready();
		throw new Meteor.Error('You have not permissions for review groups');
	}

	if (RolesHelpers.isSuperAdmin()) {
		return GroupsCollection.find()
	}

	const user = Meteor.user();
	const userGroups = Object.keys(user.roles);

	return GroupsCollection.find({
		_id: { $in: userGroups },
		alias: { $ne: DEFAULT_GROUPS.allUsers.alias }
	})

});