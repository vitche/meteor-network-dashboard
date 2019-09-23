import { Template } from 'meteor/templating';

import './groups-list.html';

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
	this.groupsList = [];
	Meteor.call('groups.method.getGroupsList', (err, result) => {
		if (err) {
			console.error(err);
		} else {
			this.groupsList = result;
			console.log(this.groupsList);
		}
		this.isGroupsLoad.set(true);
	});
});



