import { Template } from 'meteor/templating';

import './group-item.html';


Template.groupItemWidget.onCreated(function () {
});

Template.groupItemWidget.helpers({});


Template.groupItemWidget.events({
	'click .js-select-group': function (event) {
		this.onSelect(this.group._id);
	},
	'click .js-add-child-group': function (event) {
		event.stopImmediatePropagation();
		this.onAddChildGroup(this.group._id);
	},
	'click .js-delete-group': function (event) {
		event.stopImmediatePropagation();
		this.onDeleteGroup(this.group._id)
	}
});