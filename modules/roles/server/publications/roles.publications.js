import { Meteor } from 'meteor/meteor';
import { UsersCollection } from '../../../users/users.schema';

Meteor.publish('currentUserRoles', (userId) => {
	if (!userId) {
		return this.ready();
	}
	return UsersCollection.find({ _id: userId }, { fields: { roles: 1 } });
});