import { ORGANIZATION_METHODS } from '../../server/methods/origanization.server.methods';

class OrganizationServiceClass {
	constructor() {
	}

	async sendCreatingOrganizationRequest({ title }) {
		return await Meteor.callPromise(ORGANIZATION_METHODS.createOrganizationRequest, { title })
	}


	async approveOrganization(organizationId, ownerId, groupTitle) {
		return await Meteor.callPromise(ORGANIZATION_METHODS.approveOrganization, {
			organizationId,
			ownerId,
			groupTitle
		})
	}


}

export const OrganizationService = new OrganizationServiceClass();