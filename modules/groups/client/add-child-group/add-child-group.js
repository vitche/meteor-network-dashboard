import { Template } from 'meteor/templating';
import { ROLES_DICTIONARY } from '../../../../configs/roles/roles.dictionary';

import * as _ from 'lodash'

import './add-child-group.html';

Template.addChildGroupWidget.onCreated(function () {
	const appId = FlowRouter.getParam('id');
});

Template.addChildGroupWidget.helpers({
	permissions: function () {
		return Object.values(ROLES_DICTIONARY.public);
	},
});

Template.addChildGroupWidget.events({
	'click .js-create-child': function (event, template) {
		event.preventDefault();

		const selected = template.findAll('input[type=checkbox]:checked');


		const permissions = _.map(selected, function (item) {
			return item.defaultValue;
		});
	},
});