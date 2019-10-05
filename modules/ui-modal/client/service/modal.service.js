import { Template } from 'meteor/templating';

export const ModalService = {
	forkSubgroup(data) {
		Blaze.renderWithData(Template.groupForkWidget, data, document.body);
	}
};