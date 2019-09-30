import { Template } from 'meteor/templating';
import { ReactiveDict} from 'meteor/reactive-dict';

import './organization-page.html';
import './organization-list/organization-list';
import { OrganizationsCollection } from '../../both/organizations.schema';

Template.Organization_page.onCreated(function () {
	this.state = new ReactiveDict();

	this.organizationHandler = this.subscribe('organizations.publish.getOrganizationsList');

	this.autorun(() => {
		if (this.organizationHandler.ready()) {
			const organizations = OrganizationsCollection.find().fetch();
			this.state.set('organizations', organizations)
		}
	})

});

Template.Organization_page.helpers({
	organizations: function() {
		return Template.instance().state.get('organizations')
	},
	organizationsArgs: function(organizations) {
		return {
			organizations
		}
	}
});