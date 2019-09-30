import { Template } from 'meteor/templating';

import './create-organization.modal.html'

Template.Create_organization_modal.inheritsHelpersFrom('baseModal');
Template.Create_organization_modal.inheritsEventsFrom('baseModal');
Template.Create_organization_modal.inheritsHooksFrom('baseModal');

Template.Create_organization_modal.onCreated(function () {

});

Template.Create_organization_modal.helpers({});

Template.Create_organization_modal.events({
	'click .js-save': function (event, template) {
		event.preventDefault();
		const instance = Template.instance();

		const title = template.find('input[type=text]').value;

		OrganizationService.sendCreatingOrganizationRequest({ title })

	}
});