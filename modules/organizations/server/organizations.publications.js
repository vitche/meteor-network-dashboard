import { Meteor } from 'meteor/meteor';
import { RolesHelpers } from '../../roles/server/helpers/roles.helpers';
import { OrganizationsCollection } from '../both/organizations.schema';


Meteor.publish('organizations.publish.getOrganizationsList', function () {
	const userId = Meteor.userId();

	if (!userId) {
		throw new Meteor.Error('not-loggedIn', 'User must be logged in');
	}

	if (!RolesHelpers.isSuperAdmin()) {
		throw new Meteor.Error('not-authorize', 'You do not have permissions');
	}

	return OrganizationsCollection.find();
});