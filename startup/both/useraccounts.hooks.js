import { UsersMethods } from '../../modules/users/users.methods';
import { GroupsCollection } from '../../modules/groups/groups.schema';

const GROUP_DEFAULT = require('../../configs/default-data/groups.config');

/**
 *
 * @param userId { string } - User identifier
 * @param info { UserSchema } - User information after it was setup to database
 */
export const postSignUpHook = function (userId, info) {
	if (!userId) return;
	try {
		const group = GroupsCollection.findOne({ alias: GROUP_DEFAULT.allUsers.alias });

		UsersMethods.addPermissionToUser.call({
			userId,
			permissions: group.permissions,
			groupId: group._id
		});
	} catch (e) {
		throw new Meteor.Error('postSignUpHook.permission-failed', e.message);
	}
};

export const onLogoutHook = () => {
	FlowRouter.go('/signin');
};