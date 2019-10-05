import { Template } from 'meteor/templating';

import './group-item.html';


Template.groupItemWidget.onCreated(function () {
});

Template.groupItemWidget.helpers({});


Template.groupItemWidget.events({
	'click .js-select-group': function (event) {
		this.onSelect();
	},
	'click .js-add-child-group': function (event) {
		event.stopImmediatePropagation();
		this.onAddChildGroup();
	},
	'click .js-delete-group': function (event) {
		event.stopImmediatePropagation();
		this.onDeleteGroup()
	}
});