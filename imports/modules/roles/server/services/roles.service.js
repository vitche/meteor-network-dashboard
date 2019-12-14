import { Meteor } from 'meteor/meteor';
import { RolesFacade } from './roles.facade';
import { GroupModel } from '../../../models/groups/server/group.model';

class RolesServiceClass {
	constructor() {
	}

	async setUserPermissionsByGroupId(userId, groupId) {
		try {
			const { permissions } = await GroupModel.findOne({ _id: groupId }, { permissions: 1 });
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