import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { GroupsCollection } from './groups.schema';

const getGroupsList = new ValidatedMethod({
	name: 'groups.method.getGroupsList',
	validate: null,
	run() {
		const groups = GroupsCollection.find({}).fetch();
		console.log(groups);

		return groups;
	}
});

export const GroupsMethods = {
	getGroupsList
};