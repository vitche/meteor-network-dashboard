import { Meteor } from 'meteor/meteor';
import { UsersMethods } from '../../modules/users/both/users.methods';

let Group;

if ( Meteor.isClient ) {
	Group = require('../../modules/models/groups/client/group.collection').GroupCollection;
}
if ( Meteor.isServer ) {
	Group = require('../../modules/models/groups/server/group.model').GroupModel;
}


const GROUP_DEFAULT = require('../../configs/default-data/groups.config');

/**
 *
 * @param userId { string } - User identifier
 * @param info { UserSchema } - User information after it was setup to database
 */
export const postSignUpHook = function (userId, info) {
	if ( !userId ) return;
	try {
		const group = Group.findOne({ alias: GROUP_DEFAULT.allUsers.alias });

		UsersMethods.addPermissionToUser.call({
			userId,
			permissions: group.permissions,
			groupId: group._id
		});

		UsersMethods.setUserEmailAsPrimaryAfterSignUp.call({ userId });
	} catch ( e ) {
		throw new Meteor.Error('postSignUpHook.permission-failed', e.message);
	}
};

export const onLogoutHook = () => {
	FlowRouter.go('/signin');
};