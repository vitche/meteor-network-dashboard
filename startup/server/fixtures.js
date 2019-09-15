import { Meteor } from 'meteor/meteor';

import { Groups } from '../../modules/groups/server/groups.schema';
import { Organizations } from '../../modules/organizations/server/organizations.schema';
import { OrganizationsMethods } from '../../modules/organizations/server/organizations.methods';

const ORGANIZATION_DEFAULT = require('../../configs/default-data/organization.config');

Meteor.startup(() => {
	console.log('Start up project ');
	const organizations = Organizations.find({}).count();
	if (organizations) {

		return;
	}
	console.log('No organization found. Create default one');

	console.log('after parse : ', ORGANIZATION_DEFAULT)


	const organizationId = OrganizationsMethods.createOrganization.call(ORGANIZATION_DEFAULT , (err) => {
		console.log(err)
	});

	console.log('organization : ', organizationId);

});