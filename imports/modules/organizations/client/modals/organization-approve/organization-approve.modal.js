import { Template } from 'meteor/templating';

import { OrganizationService } from '../../service/organization.service';

import './organization-approve.modal.html';

Template.Approve_organization_modal.onCreated(function () {

});

Template.Approve_organization_modal.helpers({
	organization: function () {
		return Template.instance().data.organization
	}
});

Template.Approve_organization_modal.events({
	'input input[type=text]': function () {
		Template.instance().reset();
	},

	'click .js-save': async function (event, template) {
		event.preventDefault();

		const instance = Template.instance();
		const { organization } = instance.data;
		const groupTitle = template.find('input[type=text]').value;

		// TODO: think how to make it using base_modal
		instance.startLoading();
		try {
			await OrganizationService.approveOrganization(organization._id, organization.ownerId, groupTitle);
			instance.onSuccess('Organization was approved successfully')
		} catch (err) {
			instance.onError(err.message);
		}
	}
});


Template.Approve_organization_modal.inheritsHelpersFrom(Template.Base_modal);
Template.Approve_organization_modal.inheritsEventsFrom(Template.Base_modal);
Template.Approve_organization_modal.inheritsHooksFrom(Template.Base_modal);