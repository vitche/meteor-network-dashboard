import { OrganizationModel} from '../../../models/organizations/server/organization.model';

export const createOrganizationRequest = async function (title) {
	const userId = Meteor.userId();
	let result;
	// create organization;
	try {
		result = await OrganizationModel.insert({ title, ownerId: userId });
	} catch (err) {
		console.log(err);
	}

	return result;
};