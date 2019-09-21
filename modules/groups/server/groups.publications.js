import { Meteor } from 'meteor/meteor'
import { GroupsCollection } from '../both/groups.schema';

Meteor.publish('groups.lists', function () {
	const userId = this.userId;

	return GroupsCollection.find({});

});


Meteor.publish('groups.users', function (groupId) {

});