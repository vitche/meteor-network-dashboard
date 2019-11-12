import { Meteor } from 'meteor/meteor';
import { USER_METHODS_ENUM } from '../../both/user-methods.enum';


class UserServiceClass {
	constructor() {
	}
	
	findUserById(id) {
		return Meteor.callPromise(USER_METHODS_ENUM.GET_USER_BY_ID, { id })
	}
}

export const UserService = new UserServiceClass();