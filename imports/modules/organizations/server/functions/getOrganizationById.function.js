import { ROLES_DICTIONARY } from '../../../../configs/roles/roles.dictionary';
import { RolesHelpers } from '../../../roles/server/helpers/roles.helpers';
import { OrganizationsCollection } from '../../both/organizations.schema';

export const getOrganizationById = async function (organizationId) {
	let result;
	try {
		// TODO: make middleware for getting different set of data depending of the roles
		if (RolesHelpers.isHasPermission([ ROLES_DICTIONARY.private.organizationMember.alias ])) {
			result = await OrganizationsCollection.findOne({ _id: organizationId }, { title: 1 });
		} else {
			// For now return whole organization for SuperAdmin and Organization Owner
			// In future we can provide some additional information about organization (amount groups, users, peers, etc)
			result = await OrganizationsCollection.findOne({ _id: organizationId });
		}
	} catch (err) {
		throw new Meteor.Error(err.message, 'Something goes wrong')
	}
	return result
};