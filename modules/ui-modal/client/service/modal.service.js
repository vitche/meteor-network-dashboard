import { Template } from "meteor/templating";

export const ModalService = {
	forkSubgroup(data) {
		Blaze.renderWithData(Template.addGroupModal, data, document.body);
	}
};