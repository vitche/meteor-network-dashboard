import { ORGANIZATION_SERVER_METHODS } from '../../both/organizations.methods';

class OrganizationServiceClass {
	constructor() {
	}

	async sendCreatingOrganizationRequest({ title }) {
		return await Meteor.callPromise(ORGANIZATION_SERVER_METHODS.createOrganizationRequest, { title })
	}
	
	async getOrganizationsTitle() {
		let organizationTitles = [];
		try {
			organizationTitles = await Meteor.callPromise(ORGANIZATION_SERVER_METHODS.getOrganizationTitles);
		} catch (err) {
			// TODO: make notification service and show error when it appear;
			console.error(err);
		}
		
		return organizationTitles;
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