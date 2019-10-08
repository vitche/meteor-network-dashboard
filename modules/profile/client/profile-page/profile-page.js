import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict'
import './profile-page.html';

// nested components;
import '../profile-user-information/profile-user-information';
import '../profile-user-organization/profile-user-organization';
import '../profile-user-settings/profile-user-settings';

const TABS = [
	{
		title: 'Organization',
		template: 'Profile_user_organization',
	},
	{
		title: 'Setting',
		template: 'Profile_user_settings',
	}
];

Template.User_profile.onCreated(function () {
	this.state = new ReactiveDict();
	this.state.set('tabs', TABS);
	this.state.set('activeTab', TABS[0]);
});

Template.User_profile.helpers({
	activeTabName: function () {
		return Template.instance().state.get('activeTab').template;
	},
	activeTabClass: function (tab) {
		return (tab.title === Template.instance().state.get('activeTab').title) && 'active';
	},
	tabs: function () {
		return Template.instance().state.get('tabs');
	},
	isOrganizationLoading: function () {
		Template.instance().state.get('isOrganizationLoading');
	}
});

Template.User_profile.events({
	'click .js-activate-tab': function (event, template) {
		event.stopPropagation();
		const index = event.currentTarget.dataset.value;
		Template.instance().state.set('activeTab', TABS[index]);
	}
});