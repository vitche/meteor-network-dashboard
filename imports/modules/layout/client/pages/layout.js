import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { AccountsTemplates } from 'meteor/useraccounts:core';
import { ReactiveDict } from 'meteor/reactive-dict';

import { ROUTES_CONFIG } from '../../../../startup/both/routes.config';

import './layout.html'


Template.layout.onRendered(function () {
	const files = [ 'dist/js/adminlte.js', 'dist/js/pages/dashboard.js', 'dist/js/demo.js' ];
	
	files.forEach((file) => {
		$(document).ready(function () {
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = file;
			$('body').append(script);
		});
	})
});


function onCreated() {
	this.state = new ReactiveDict();
	
	
	
	this.onSelect = (selectedOrganization) => {
		FlowRouter.go(ROUTES_CONFIG.organizations.info.name, { id: selectedOrganization._id });
	}
}

Template.layout.onCreated(onCreated);

Template.layout.helpers({
	organizations: function () {
		return Template.instance().state.get('organizations')
	},
	isOrganizationLoading: function () {
		return !!Template.instance().state.get('organizations')
	},
	organizationArgs: function (organization) {
		return {
			organization,
			onSelect: Template.instance().onSelect
		}
	},
	emailLocal: function () {
		const user = Meteor.user();
		// As we work with synchronous MeteorJS it can be delay between receiving data from MiniMongo
		if ( !user ) {
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