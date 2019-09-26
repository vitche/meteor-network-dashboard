import { Template } from 'meteor/templating';
import { ROLES_DICTIONARY } from '../../../../configs/roles/roles.dictionary';

import * as _ from 'lodash'

import './add-child-group.html';

Template.addChildGroupWidget.onCreated(function () {
	const parentId = FlowRouter.getParam('id');

});

Template.addChildGroupWidget.helpers({
	permissions: function () {
		const permissions = Object.values(ROLES_DICTIONARY.public).map((permission) => {
			permission.checked = !!_.find(Template.instance().parentGroup.permissions, permission.alias)
			return permission;
		})
		return Object.values(ROLES_DICTIONARY.public)
	},
});

Template.addChildGroupWidget.events({
	'click .js-create-child': function (event, template) {
		event.preventDefault();

		const groupName = template.find('input[type=text]').value;
		const selectedPermissions = template.findAll('input[type=checkbox]:checked');
		const permissions = _.map(selectedPermissions, function (item) {
			return item.defaultValue;
		});
		console.log(permissions);
	},
});