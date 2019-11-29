import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { AccountsTemplates } from 'meteor/useraccounts:core';
import { ReactiveDict } from 'meteor/reactive-dict';

import { ROUTES_CONFIG } from '../../../../startup/both/routes.config';

import './layout.html'
import { OrganizationService } from '../../../organizations/client/service/organization.service';
import { ModalService } from '../../../ui-modal/client/service/modal.service';

function onRendered() {
	const files = [ 'dist/js/adminlte.js', 'dist/js/pages/dashboard.js', 'dist/js/demo.js' ];
	
	files.forEach((file) => {
		$(document).ready(function () {
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = file;
			$('body').append(script);
		});
	})
}

async function onCreated() {
	this.state = new ReactiveDict();
	
	this.getOrganizationTitles = async () => {
		const organizationTitles = await OrganizationService.getOrganizationsTitle();
		this.state.set('titles', organizationTitles);
	};
	
	this.getOrganizationTitles();
}

//----- HELPERS

function getOrganizationTitle() {
	return Template.instance().state.get('titles')
}

function getUserEmail() {
	const user = Meteor.user();
	// As we work with synchronous MeteorJS it can be delay between receiving data from MiniMongo
	if ( !user ) {
		return;
	}
	return user.emails && user.emails[0];
}

function toggleModal() {
	return Session.get('activeModal');
}

//----- EVENTS

function createOrganization() {
	ModalService.createOrganization();
}

function logout() {
	AccountsTemplates.logout();
}

function goToProfile() {
	FlowRouter.go(ROUTES_CONFIG.profile.profile.name);
}

function goToOrganization(event, template) {
	event.preventDefault();
	FlowRouter.go(ROUTES_CONFIG.organizations.info.name, {id: event.currentTarget.dataset.id});
}

//----- REGISTER

Template.layout.onRendered(onRendered);
Template.layout.onCreated(onCreated);

Template.layout.helpers({
	organizations: getOrganizationTitle,
	userEmail: getUserEmail,
	isModalActive: toggleModal
});

Template.layout.events({
	'click .js-profile-button': goToProfile,
	'click .js-logout-button': logout,
	'click .js-create-organization': createOrganization,
	'click .js-go-to-organization': goToOrganization
});