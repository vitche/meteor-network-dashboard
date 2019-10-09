import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { AccountsTemplates } from 'meteor/useraccounts:core';

import './layout.html'
import { ROUTES_CONFIG } from '../../startup/both/routes.config';

Template.layout.onCreated(function () {

});

Template.layout.helpers({
	peerIdentifier: function () {
		return FlowRouter.getParam('_id');
	},
	emailLocal: function () {
		const user = Meteor.user();
		// As we work with synchronous MeteorJS it can be delay between receiving data from MiniMongo
		if (!user) {
			return;
		}
		return user.emails && user.emails[0];
	},
	activeModal: function () {
		return Session.get('activeModal');
	}
});

Template.layout.events({
	'click .js-profile-button'() {
		FlowRouter.go(ROUTES_CONFIG.profile.profile.name);
	},
	'click .js-logout-button'() {
		AccountsTemplates.logout();
	}
});