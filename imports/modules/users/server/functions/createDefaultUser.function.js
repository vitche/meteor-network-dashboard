import { GROUP_ALIASES } from '../../../../configs/groups/groups.config';
import { GroupsCollection } from '../../../groups/both/groups.schema';
import { RolesService } from '../../../roles/server/services/roles.service';

export const createDefaultUser = async (email) => {
	let userId;
	try {
		userId = Accounts.createUser({ email });

		const group = await GroupsCollection.findOne({
			alias: GROUP_ALIASES.defaultAllUsersAlias
		});

		await RolesService.setUserPermissions(userId, group.permissions, group._id)
	} catch (err) {
		console.error('createDefaultUser: ', err);
		throw new Meteor.Error(400, err.message);
	}

	return userId;
};