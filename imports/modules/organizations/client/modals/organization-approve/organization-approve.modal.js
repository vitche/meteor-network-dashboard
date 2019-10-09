import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './organization-approve.modal.html';

Template.Approve_organization_modal.onCreated(function () {
});

Template.Approve_organization_modal.helpers({
	organization: function () {
		return Template.instance().data.organization
	}
});

Template.Approve_organization_modal.events({
	'click .js-save': async function (event, template) {
		const instance = Template.instance();
		const { organization } = instance.data;

		const groupTitle = template.find('input[type=text]').value;

		instance.startLoading();
		Meteor.call('organization.method.approveOrganization', {
			organizationId: organization._id,
			ownerId: organization.ownerId,
			groupTitle
		}, (err, resolve) => {
			if (err) {

				console.log("ERROR : ", err);
				return;
			}
			instance.finishLoading();
			instance.close(template.view);
		});

	}
});


Template.Approve_organization_modal.inheritsHelpersFrom(Template.Base_modal);
Template.Approve_organization_modal.inheritsEventsFrom(Template.Base_modal);
Template.Approve_organization_modal.inheritsHooksFrom(Template.Base_modal);