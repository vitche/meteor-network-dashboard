class OrganizationServiceClass {
	constructor() {
	}

	async sendCreatingOrganizationRequest({ title }) {
		return await Meteor.callPromise('organization.methods.createOrganizationRequest', { title })
	}


	async approveOrganization(organizationId, ownerId, groupTitle) {
		return await Meteor.callPromise('organization.methods.approveOrganization', {
			organizationId,
			ownerId,
			groupTitle
		})
	}


}

export const OrganizationService = new OrganizationServiceClass();