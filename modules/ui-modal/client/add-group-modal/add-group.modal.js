import { Template } from "meteor/templating";

import './add-group.modal.html';

Template.addGroupModal.onCreated(function () {
	console.log('addGroupModal');
});

Template.addGroupModal.events({
	'click .js-modal-close': function () {
		Session.set('activeModal', false);
	}
});