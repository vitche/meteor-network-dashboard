import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { ReactiveVar } from 'meteor/reactive-var';

import { OrganizationService } from '../../service/organization.service';

import './create-organization.modal.html';

Template.Create_organization_modal.onCreated(function () {
	this.state = new ReactiveDict();
	this.defaultSettings = new ReactiveVar();

	this.defaultSettings.set(true);

});

Template.Create_organization_modal.helpers({
	hasError: function () {
		return Template.instance().state.get('hasError');
	},
	hlDefaultSettings: function () {
		return Template.instance().defaultSettings.get();
	},
	hlSettingsError: function () {
		return Template.instance().state.get('hlSettingsError');
	}
});

Template.Create_organization_modal.events({
	'change .js-hl-settings': function (event, template) {
		Template.instance().defaultSettings.set(event.currentTarget.checked);
	},
	'input input[name="organization_name"]': function () {
		Template.instance().state.set('hasError', false);
		Template.instance().reset();
	},
	'click .js-save': async function (event, template) {
		event.preventDefault();

		const instance = Template.instance();

		const title = template.find('input[name="organization_name"]').value;
		let address_1 = '', address_2 = '';
		if ( !instance.defaultSettings.get() ) {
			address_1 = template.find('input[name="hl_ip_address_1"]').value;
			address_2 = template.find('input[name="hl_ip_address_2"]').value;
		}

		if ( !title ) {
			instance.state.set('hasError', true);
			return;
		}

		instance.startLoading();
		try {
			await OrganizationService.sendCreatingOrganizationRequest({
				title,
				defaultSettings: instance.defaultSettings.get(),
				settings: { address_1, address_2 }
			});
			instance.onSuccess('Organization was created');
		} catch ( err ) {
			instance.onError(err.message);
		}
	}
});

Template.Create_organization_modal.inheritsHelpersFrom(Template.Base_modal);
Template.Create_organization_modal.inheritsEventsFrom(Template.Base_modal);
Template.Create_organization_modal.inheritsHooksFrom(Template.Base_modal);