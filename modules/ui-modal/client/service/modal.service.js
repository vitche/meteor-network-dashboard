import { Template } from 'meteor/templating';

export const ModalService = {
	forkSubgroup(data) {
		Blaze.renderWithData(Template.groupForkWidget, data, document.body);
	},
	createOrganization(data) {
		Blaze.renderWithData(Template.Create_organization_modal, data, document.body);
	}
};