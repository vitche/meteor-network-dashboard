import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './organization-info.html';

import { ModalService } from '../../../../ui-modal/client/service/modal.service';
import { OrganizationService } from '../../service/organization.service';

Template.Organization_info.onCreated(function () {
	this.state = new ReactiveDict();

	this.state.set('isLoading', true);
	this.autorun(async() => {
		FlowRouter.watchPathChange();
		var currentContext = FlowRouter.current();
		const organizationId = currentContext.params && currentContext.params.id;

		const organization = await OrganizationService.getOrganizationById(organizationId);

		if ( organization ) {
			this.state.set('organization', organization);
		}

		this.state.set('isLoading', false);
	});

});

Template.Organization_info.helpers({
	isLoading: function () {
		return Template.instance().state.get('isLoading');
	},
	organization: function () {
		return Template.instance().state.get('organization');
	}
});

Template.Organization_info.events({
	'click .js-approve-modal': function () {
		ModalService.approveOrganizationModal({ organization: Template.instance().state.get('organization') })
	}
});