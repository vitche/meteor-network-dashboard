import { Template } from 'meteor/templating';

export const ModalService = {
	forkSubgroup(data) {
		Blaze.renderWithData(Template.groupForkWidget, data, document.body);
	},
	createOrganization(data) {
		Blaze.renderWithData(Template.Create_organization_modal, data, document.body);
	},
	approveOrganizationModal(data) {
		Blaze.renderWithData(Template.Approve_organization_modal, data, document.body);
	},
	createTask(data) {
		Blaze.renderWithData(Template.Create_task_modal, data, document.body);
	}
};