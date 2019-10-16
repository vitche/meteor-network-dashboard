import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './setup-profile.html';
import { ProfileService } from '../../services/profile.service';

Template.Setup_profile.onCreated(function () {
	this.state = new ReactiveDict();
});

Template.Setup_profile.helpers({
	onError: function () {
		return Template.instance().state.get('onError');
	}
});

Template.Setup_profile.events({
	'input input[type=text]': function (event, tempalte) {
		Template.instance().state.set('onError', false);
	},
	'submit #setup-profile-form': async function (event, template) {
		event.preventDefault();

		const target = event.target;
		const firstName = target.firstName.value;
		const lastName = target.lastName.value;

		if (!firstName || !lastName) {
			Template.instance().state.set('onError', 'First and Last name are required');
			return;
		}

		try {
			await ProfileService.setupProfile({ firstName, lastName });
		} catch (err) {
			Template.instance().state.set('onError', 'Something went wrong.');
		}

		FlowRouter.go('/')

	}
});