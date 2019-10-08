import { Template } from 'meteor/templating';
import { ROLES_DICTIONARY } from '../../../../configs/roles/roles.dictionary';

import * as _ from 'lodash'

import './group-fork.html';

Template.groupForkWidget.onCreated(function () {

});

Template.groupForkWidget.helpers({
	permissions: function () {
		const permissions = Object.values(ROLES_DICTIONARY.public).map((permission) => {
			permission.checked = !!_.find(Template.instance().data.parentGroup.permissions, permission.alias);
			return permission;
		});
		return Object.values(ROLES_DICTIONARY.public)
	},
});

Template.groupForkWidget.events({
	'click .js-fork-group': function (event, template) {
		event.preventDefault();
		const instance = Template.instance();
		const parentGroup = instance.data.parentGroup;

		const groupName = template.find('input[type=text]').value;
		const selectedPermissions = template.findAll('input[type=checkbox]:checked');
		const permissions = _.map(selectedPermissions, function (item) {
			return item.defaultValue;
		});

		instance.isLoading.set(true);
		Meteor.call('groups.method.forkGroup', {
			title: groupName,
			permissions,
			parentGroupId: parentGroup._id,
			organizationId: parentGroup.organizationId || null
		}, (err, result) => {
			if (err) {
				throw new Error(err)
			}

			instance.isLoading.set(false);
		})
	},
});

Template.groupForkWidget.inheritsHelpersFrom(Template.Base_modal);
Template.groupForkWidget.inheritsEventsFrom(Template.Base_modal);
Template.groupForkWidget.inheritsHooksFrom(Template.Base_modal);