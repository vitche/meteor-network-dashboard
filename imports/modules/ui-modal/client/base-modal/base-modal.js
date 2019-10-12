import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './base-modal.html';

Template.Base_modal.onCreated(function () {
	this.state = new ReactiveDict();
	this.state.set('isLoading', false);


	Session.set('activeModal', true);
	$('body').addClass('modal-open');


	this.close = (view) => {
		Session.set('activeModal', false);
		Blaze.remove(view);

	};

	this.startLoading = () => {
		this.state.set('isLoading', true)
	};

	this.finishLoading = () => {
		this.state.set('isLoading', false);
	};

	this.onError = (errorMessage) => {
		this.finishLoading();
		this.state.set('onError', `Something went wrong: ${ errorMessage }`)

		// TODO: is it needed??
		setTimeout(() => {
			this.reset()
		}, 3000);
	};

	this.onSuccess = (successMessage) => {
		this.finishLoading();
		this.state.set('onSuccess', successMessage);
	};

	this.reset = () => {
		this.state.set('onError', false);
		this.state.set('onSuccess', false);
	}

});

Template.Base_modal.onDestroyed(function () {
	$('body').removeClass('modal-open');
});

Template.Base_modal.helpers({
	isLoading: function () {
		return Template.instance().state.get('isLoading');
	},
	onError: function () {
		return Template.instance().state.get('onError');
	},
	onSuccess: function () {
		return Template.instance().state.get('onSuccess');
	}
});

Template.Base_modal.events({
	'click .js-modal-close': function (event, template) {
		Template.instance().close(template.view)
	}
});