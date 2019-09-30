import { Template } from 'meteor/templating';

import { OrganizationService } from '../../../../organizations/client/service/organization.service';

import './create-organization.modal.html'


Template.Create_organization_modal.onCreated(function () {

});

Template.Create_organization_modal.helpers({});

Template.Create_organization_modal.events({
	'click .js-save': async function (event, template) {
		event.preventDefault();
		const instance = Template.instance();

		const title = template.find('input[type=text]').value;

		OrganizationService.sendCreatingOrganizationRequest({ title })

	}
});

Template.Create_organization_modal.inheritsHelpersFrom(Template.baseModal);
Template.Create_organization_modal.inheritsEventsFrom(Template.baseModal);
Template.Create_organization_modal.inheritsHooksFrom(Template.baseModal);