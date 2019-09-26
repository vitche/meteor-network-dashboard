import { Template } from 'meteor/templating';

import './base-modal.html';

Template.baseModal.onCreated(function () {
	Session.set('activeModal', 'addGroupModal');
	$('body').addClass('modal-open')
});

Template.baseModal.onDestroyed(function () {
	$('body').removeClass('modal-open')
});

Template.baseModal.helpers({});

Template.baseModal.events({
	'click .js-modal-close': function (event, template) {
		Session.set('activeModal', false);
		Blaze.remove(template.view);
	}
});