import { OrganizationModel } from '../../../models/organizations/server/organization.model';

export const getOrganizationTitles = async () => {
	const userId = Meteor.userId();
	
	if (!userId) {
		throw new Meteor.Error('not-authorized', 'User not authorized');
	}
	
	let organizations;
	
	try {
		organizations = await OrganizationModel.find({ownerId: userId}, { title: 1}).fetch();
	} catch (err) {
		throw new Meteor.Error('database-err', err.message);
	}
	
	return organizations;
	
};