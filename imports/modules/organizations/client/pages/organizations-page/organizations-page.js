import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';


import '../../components/organization-item/organization-item';

import './organizations-page.html';
import { ModalService } from '../../../../ui-modal/client/service/modal.service';
import { OrganizationService } from '../../service/organization.service';

Template.Organization_page.onCreated(async function () {
	this.state = new ReactiveDict();

	try {
		const organizations = await OrganizationService.getOrganizationsList();
		this.state.set('organizations', organizations);
	} catch ( err ) {
		console.error(err);
		//todo: add error notification
	}

	this.onSelect = (selectedOrganization) => {
		ModalService.approveOrganizationModal({ organization: selectedOrganization });
	};
});

Template.Organization_page.helpers({
	organizations: function () {
		return Template.instance().state.get('organizations');
	},
	isOrganizationLoading: function () {
		return !!Template.instance().state.get('organizations');
	},
	organizationArgs: function (organization) {
		return {
			organization,
			onSelect: Template.instance().onSelect
		};
	}
});