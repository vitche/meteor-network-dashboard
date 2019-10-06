import { Template } from 'meteor/templating';

import './base-modal.html';

Template.Base_modal.onCreated(function () {
	this.isLoading = new ReactiveVar(false);
	Session.set('activeModal', true);
	$('body').addClass('modal-open');

	this.close = (view) => {
		Session.set('activeModal', false);
		Blaze.remove(view);

	};

	this.startLoading = () => {
		this.isLoading.set(true)
	};

	this.finishLoading = () => {
		this.isLoading.set(false);
	};

});

Template.Base_modal.onDestroyed(function () {
	$('body').removeClass('modal-open');
});

Template.Base_modal.helpers({
	isLoading: function () {
		return Template.instance().isLoading.get();
	}
});

Template.Base_modal.events({
	'click .js-modal-close': function (event, template) {
		Template.instance().close(template.view)
	}
});