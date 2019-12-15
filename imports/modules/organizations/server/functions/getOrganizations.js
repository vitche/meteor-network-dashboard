import { OrganizationModel } from '../../../models/organizations/server/organization.model';

export const getOrganizations = () => {
	return OrganizationModel.find().fetch();
};