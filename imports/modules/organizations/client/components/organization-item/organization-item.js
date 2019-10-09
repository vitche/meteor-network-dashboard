import { Template } from 'meteor/templating';

import './organization-item.html';


Template.Organization_table_item.onCreated(function () {
});

Template.Organization_table_item.helpers({});


Template.Organization_table_item.events({
	'click .js-select-item': function (event) {
		this.onSelect(this.organization);
	}
});