import { Meteor } from 'meteor/meteor';
import { RolesHelpers } from '../../roles/server/helpers/roles.helpers';
import { OrganizationCollection } from '../../models/organizations/server/organization.collection';
import { ORGANIZATION_PUBLICATIONS } from '../both/organization.publications.enum';
import { OrganizationModel } from '../../models/organizations/server/organization.model';


// TODO: make a pagination
Meteor.publish('organizations.publish.getOrganizationsList', function () {
	const userId = Meteor.userId();
	
	if ( !userId ) {
		throw new Meteor.Error('not-loggedIn', 'User must be logged in');
	}
	
	if ( !RolesHelpers.isSuperAdmin() ) {
		throw new Meteor.Error('not-authorize', 'You do not have permissions');
	}
	
	return OrganizationCollection.find();
});

Meteor.publish('organizations.publish.getUserOrganization', function () {
	const user = Meteor.user();
	
	if ( !user ) {
		throw new Meteor.Error('not-loggedIn', 'User must be logged in');
	}
	
	if ( !user.profile.organizationId ) {
		this.ready();
	}
	
	
	return OrganizationCollection.find({ _id: user.profile.organizationId })
	
});

Meteor.publish('organizations.publish.getOrganizationById', function (organizationId) {
	const userId = Meteor.userId();
	
	if ( !userId ) {
		throw new Meteor.Error('not-loggedIn', 'User must be logged in');
	}
	
	if ( !RolesHelpers.isSuperAdmin() ) {
		throw new Meteor.Error('not-authorize', 'You do not have permissions');
	}
	
	return OrganizationCollection.find({ _id: organizationId });
	
});

Meteor.publish(ORGANIZATION_PUBLICATIONS.getTitles, () => {
	const userId = Meteor.userId();
	
	if ( !userId ) {
		throw new Meteor.Error('not-authorized', 'User not authorized');
	}
	
	return OrganizationModel.find({ ownerId: userId }, { title: 1, verified: 1 });
});