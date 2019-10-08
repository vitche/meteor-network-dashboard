import { Template } from 'meteor/templating';

import './profile-user-information.html'

Template.Profile_user_information.onCreated(function () {
});

Template.Profile_user_information.helpers({
	userFullName: function () {
		const user = Meteor.user();
		return `${ user.profile.firstName } ${ user.profile.lastName }`;
	},
	userEmail: function () {
		const user = Meteor.user();
		// As we work with synchronous MeteorJS it can be delay between receiving data from MiniMongo
		if (!user) {
			return;
		}
		return user.emails && user.emails[0].address;
	},
});