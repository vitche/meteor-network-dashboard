import { Meteor } from 'meteor/meteor';
import { OrganizationCollection } from '../../../models/organizations/server/organization.collection';

export const approveOrganization = async function (organizationId) {
	try {
		// set root group id and default cluster id to organization document
		await OrganizationCollection.update(organizationId, {
			$set: {
				verified: true,
			}
		});
	} catch ( err ) {
		console.error('approveOrganization: ', err);
		throw new Meteor.Error('approve-organization-error', err.message);
	}
	return true;
};