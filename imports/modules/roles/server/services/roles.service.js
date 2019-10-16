import { Meteor } from 'meteor/meteor';
import { GroupsCollection } from '../../../groups/both/groups.schema';
import { RolesFacade } from './roles.facade';

class RolesServiceClass {
	constructor() {
	}

	async setUserPermissionsByGroupId(userId, groupId) {
		try {
			const { permissions } = await GroupsCollection.findOne({ _id: groupId }, { permissions: 1 });
			RolesFacade.addUsersToRoles(userId, permissions, groupId)
		} catch (err) {
			throw new Meteor.Error('user-permission', err.message)
		}
	}

	setUserPermissions(userId, permissions, groupId) {
		return RolesFacade.addUsersToRoles(userId, permissions, groupId);
	}


}

export const RolesService = new RolesServiceClass();