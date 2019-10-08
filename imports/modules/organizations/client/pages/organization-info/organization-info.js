import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './organization-info.html';
import { ModalService } from '../../../../ui-modal/client/service/modal.service';
import { OrganizationsCollection } from '../../../both/organizations.schema';

Template.Organization_info.onCreated(function () {
	this.state = new ReactiveDict();
	const organizationId = FlowRouter.getParam('id');
	this.state.set('isLoading', true);

	const organizationSubscription = this.subscribe('organizations.publish.getOrganizationById', organizationId);

	this.autorun(() => {
		if (organizationSubscription.ready()) {
			const organization = OrganizationsCollection.findOne({ _id: organizationId });
			if (organization) {
				this.state.set('organization', organization);
			}

			this.state.set('isLoading', false);
		}
	})

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