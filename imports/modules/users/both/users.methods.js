import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { UsersCollection } from './users.schema';

const setUserWithDefaultSettings = new ValidatedMethod({
	name: 'users.setDefaultSettings',
	validate: null,
	run({ userId, user, organizationId }) {
		return UsersCollection.update(userId, {
			$set: {
				'emails.0.verified': user.emailVerified,
				'emails.0.primary': user.emailPrimary,
				'profile.firstName': user.profile.firstName,
				'profile.lastName': user.profile.lastName,
				'profile.organizationId': organizationId || null
			}
		})
	}
});

const setUserEmailAsPrimaryAfterSignUp = new ValidatedMethod({
	name: 'users.setUserEmailAsPrimaryAfterSignUp',
	validate: null,
	run({ userId }) {
		return UsersCollection.update(userId, {
			$set: {
				'emails.0.primary': true,
			}
		})
	}
});

const addPermissionToUser = new ValidatedMethod({
	name: 'users.addPermissionToUser',
	validate: new SimpleSchema({
		userId: { type: String },
		permissions: { type: Array },
		'permissions.$': { type: String },
		groupId: { type: String }
	}).validator(),
	run({ userId, groupId, permissions }) {
		return Roles.addUsersToRoles(userId, permissions, groupId)
	}
});

const sendEnrollmentLetter = (data) => {
	Meteor.call('users.sendEnrollmentLetter', data, (err, response) => {
		if ( err ) {
			console.error(err);
			return;
		}

		console.log(response);
	})
};

export const UsersMethods = {
	setUserWithDefaultSettings,
	addPermissionToUser,
	sendEnrollmentLetter,
	setUserEmailAsPrimaryAfterSignUp
};