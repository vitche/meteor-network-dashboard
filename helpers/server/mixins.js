import * as _ from 'lodash';
import { SERVER_SESSIONS_KEYS } from '../../configs/server-session.keys';

export const loggedIn = function (methodOptions) {

	const runFunc = methodOptions.run;

	methodOptions.run = function () {
		if (!this.userId) {
			throw new Meteor.Error('You need to be logged in to call this method');
		}
		return runFunc.call(this, ...arguments);
	};

	return methodOptions;
};

export const roles = function (methodOptions) {
	const runFunc = methodOptions.run;

	methodOptions.run = function () {
		const currentUserPermissions = ServerSession.get(SERVER_SESSIONS_KEYS.userPermissions);
		if (!_.intersection(currentUserPermissions, methodOptions.roles).length) {
			throw new Meteor.Error('You have not permissions for review groups');

		}
		return runFunc.call(this, ...arguments);
	};

	return methodOptions;
};

export const Mixins = {
	loggedIn,
	roles
};