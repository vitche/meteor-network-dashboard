import { Template } from 'meteor/templating';

import './base-modal.html';

Template.baseModal.onCreated(function () {
	this.isLoading = new ReactiveVar(false);
	Session.set('activeModal', true);
	$('body').addClass('modal-open')
});

Template.baseModal.onDestroyed(function () {
	$('body').removeClass('modal-open')
});

Template.baseModal.helpers({
	isLoading: function () {
		return Template.instance().isLoading.get();
	}
});

Template.baseModal.events({
	'click .js-modal-close': function (event, template) {
		Session.set('activeModal', false);
		Blaze.remove(template.view);
	}
});