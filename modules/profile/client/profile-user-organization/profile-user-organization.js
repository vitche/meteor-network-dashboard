import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict'

import './profile-user-organization.html';

Template.Profile_user_organization.onCreated(function () {
	this.state = new ReactiveDict();
	const user = Meteor.user();
	this.state.set('isOrganizationExist', user.profile.organizationId);
	this._init = () => {
		if (user.profile.organizationId) {
			this.state.set('isOrganizationLoading', true);
			Meteor.call('organization.getOrganizationById', { organizationId: user.profile.organizationId }, (err, response) => {
				if (err) {
					throw new Error(err);
				}

				console.log(response)
				this.state.set('organization', response);
				this.state.set('isOrganizationLoading', false);
			})
		} else {

		}
	};

	this._init();
});


Template.Profile_user_organization.helpers({
	isOrganizationLoading: function () {
		return Template.instance().state.get('isOrganizationLoading');
	},
	isOrganizationExist: function () {
		return Template.instance().state.get('isOrganizationExist');
	},
	organization: function () {
		return Template.instance().state.get('organization');
	},
	membership: function () {
		const instance = Template.instance();
		return instance.state.get('organization').ownerId === Meteor.userId() ? 'Owner' : 'Member';
	}
});