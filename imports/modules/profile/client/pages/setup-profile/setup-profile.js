import { Template } from 'meteor/templating';

import './setup-profile.html';

Template.Setup_profile.onCreated(function () {
	console.log('hello');
});

Template.Setup_profile.events({
	'submit setup-profile-form': function (event, template) {
		event.preventDefault();
		console.log('submbit')
	}
});