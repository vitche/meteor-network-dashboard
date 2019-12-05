import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import '../../components/device-healt-chart/device-healt-chart';

import './organization-info.css';
import './organization-info.html';


import { ModalService } from '../../../../ui-modal/client/service/modal.service';
import { OrganizationService } from '../../service/organization.service';
import { lineChart } from '../../../../../utils/client/plots/flot-Interactive-chart';


Template.Organization_info.onRendered(function() {
	lineChart();
});

Template.Organization_info.onCreated(function () {
	this.state = new ReactiveDict();

	this.autorun(async () => {
		FlowRouter.watchPathChange();
		var currentContext = FlowRouter.current();
		const organizationId = currentContext.params && currentContext.params.id;

		this.state.set('isLoading', true);
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
		ModalService.approveOrganizationModal({ organization: Template.instance().state.get('organization') });
	}
});