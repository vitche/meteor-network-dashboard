import { ORGANIZATION_SERVER_METHODS } from '../../both/organizations.methods';

class OrganizationServiceClass {
	constructor() {
	}

	async sendCreatingOrganizationRequest({ title }) {
		return await Meteor.callPromise(ORGANIZATION_SERVER_METHODS.createOrganizationRequest, { title })
	}


	async approveOrganization(organizationId, ownerId, groupTitle) {
		return await Meteor.callPromise(ORGANIZATION_SERVER_METHODS.approveOrganization, {
			organizationId,
			ownerId,
			groupTitle
		})
	}


}

export const OrganizationService = new OrganizationServiceClass();