import { OrganizationCollection } from '../../../models/organizations/server/organization.collection';

export const getOrganizationById = async function (organizationId) {
	let result;
	try {
		result = await OrganizationCollection.findOne({ _id: organizationId });
	} catch (err) {
		throw new Meteor.Error('database-request-error', 'err.message')
	}
	return result
};