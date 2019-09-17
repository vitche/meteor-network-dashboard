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

const sendEnrollmentLetter = new ValidatedMethod({
	name: 'users.sendEnrollmentLetter',
	validate: new SimpleSchema({
		userId: { type: String },
		email: { type: String }
	}).validator(),
	run({ userId, email }) {
		return Accounts.sendEnrollmentEmail(userId, email)
	}
});

export const UsersMethods = {
	setUserWithDefaultSettings,
	sendEnrollmentLetter,
	addPermissionToUser
};