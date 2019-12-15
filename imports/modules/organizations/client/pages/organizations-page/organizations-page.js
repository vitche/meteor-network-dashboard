import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { OrganizationCollection } from '../../../../models/organizations/client/organization.collection';

import '../../components/organization-item/organization-item';

import './organizations-page.html';
import { ModalService } from '../../../../ui-modal/client/service/modal.service';

Template.Organization_page.onCreated(function () {
	this.state = new ReactiveDict();

	this.organizationHandler = this.subscribe('organizations.publish.getOrganizationsList');

	this.autorun(() => {
		if (this.organizationHandler.ready()) {
			const organizations = OrganizationCollection.find().fetch();
			this.state.set('organizations', organizations)
		}
	});

	this.onSelect = (selectedOrganization) => {
		ModalService.approveOrganizationModal(selectedOrganization);
	}

});

Template.Organization_page.helpers({
	organizations: function () {
		return Template.instance().state.get('organizations')
	},
	isOrganizationLoading: function () {
		return !!Template.instance().state.get('organizations')
	},
	organizationArgs: function (organization) {
		return {
			organization,
			onSelect: Template.instance().onSelect
		}
	}
});