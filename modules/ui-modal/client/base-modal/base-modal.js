import { Template } from 'meteor/templating';

import './base-modal.html';

Template.baseModal.onCreated(function () {
	$('body').addClass('modal-open')
});

Template.baseModal.onDestroyed(function () {
	$('body').removeCLass('modal-open')
});

Template.baseModal.helpers({
	activeModal: function () {
		return Session.get('activeModal');
	}
});