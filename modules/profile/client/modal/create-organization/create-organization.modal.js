import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { OrganizationService } from '../../../../organizations/client/service/organization.service';

import './create-organization.modal.html'


Template.Create_organization_modal.onCreated(function () {
	this.state = new ReactiveDict()
});

Template.Create_organization_modal.helpers({
	hasError: function () {
		return Template.instance().state.get('hasError');
	}
});

Template.Create_organization_modal.events({
	'input input[type=text]': function () {
		Template.instance().state.set('hasError', false);
	},
	'click .js-save': async function (event, template) {
		event.preventDefault();
		const instance = Template.instance();


		const title = template.find('input[type=text]').value;
		if (!title) {
			instance.state.set('hasError', true);
			return;
		}

		instance.startLoading();
		await OrganizationService.sendCreatingOrganizationRequest({ title });

		instance.finishLoading();
		instance.close(template.view);
	}
});

Template.Create_organization_modal.inheritsHelpersFrom(Template.baseModal);
Template.Create_organization_modal.inheritsEventsFrom(Template.baseModal);
Template.Create_organization_modal.inheritsHooksFrom(Template.baseModal);