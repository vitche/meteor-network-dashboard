import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict'

import { OrganizationsCollection } from '../../../../organizations/both/organizations.schema';
import { RolesService } from '../../../../roles/client/services/roles.service';
import { ModalService } from '../../../../ui-modal/client/service/modal.service';
import { ProfileService } from '../../services/profile.service';

import './profile-user-organization.html';


Template.Profile_user_organization.onCreated(function () {
	this.state = new ReactiveDict();

	this.state.set('isOrganizationLoading', true);

	const organizationHandler = this.subscribe('organizations.publish.getUserOrganization');

	this.autorun(() => {
		if (organizationHandler.ready()) {
			// get organization where current user is owner
			const userOrganization = OrganizationsCollection.find().fetch();

			if (userOrganization.length) {
				this.state.set('organization', userOrganization[0]);
			}

			this.state.set('isOrganizationLoading', false);
		}
	});
});


Template.Profile_user_organization.helpers({
	isOrganizationLoading: function () {
		return Template.instance().state.get('isOrganizationLoading');
	},
	organization: function () {
		return Template.instance().state.get('organization');
	},
	canInviteUser: function () {
		const organization = Template.instance().state.get('organization');
		return organization && organization.verified && RolesService.isAllowToInviteUsers();
	},
	membership: function () {
		const instance = Template.instance();
		return instance.state.get('organization').ownerId === Meteor.userId() ? 'Owner' : 'Member';
	}
});

Template.Profile_user_organization.events({
	'click .js-create-organization': function () {
		ModalService.createOrganization();
	},
	'submit .invite-user-form': async function (event, template) {
		event.preventDefault();
		const email = template.find('input[type=email]').value;

		await ProfileService.inviteUserToOrganization(email);
	}
});