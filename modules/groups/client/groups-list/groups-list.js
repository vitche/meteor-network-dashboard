import { Template } from 'meteor/templating';

import './groups-list.html';
import { GroupsMethods } from '../../both/groups.methods';

function AsyncMethod(callback) {
	return new Promise((resolve, reject) => {
		callback.call((err, result) => {
			if (err) {
				reject(err);
			}
			console.log(resolve);
			resolve(result);
		})
	})
}

Template.groupsListWidget.onCreated(async function () {
	this.isGroupsLoad = new ReactiveVar(false);
	this.groupsList = await AsyncMethod(GroupsMethods.getGroupsList);
	this.isGroupsLoad.set(true);
});



