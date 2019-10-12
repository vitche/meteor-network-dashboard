import { OrganizationsCollection } from '../../both/organizations.schema';

export const createOrganizationRequest = async function (title) {
	const userId = Meteor.userId();
	let result;
	// create organization;
	try {
		result = await OrganizationsCollection.insert({ title, ownerId: userId });
	} catch (err) {
		console.log(err);
	}

	return result;
};