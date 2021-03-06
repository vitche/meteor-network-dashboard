import { ORGANIZATION_SERVER_METHODS } from '../../both/organizations.methods';
import { ROUTES_CONFIG } from '../../../../startup/both/routes.config';

import * as _ from 'lodash';

class OrganizationServiceClass {
	constructor() {
	}

	async sendCreatingOrganizationRequest({ title }) {
		return await Meteor.callPromise(ORGANIZATION_SERVER_METHODS.createOrganizationRequest, { title })
	}

	async getOrganizationById(organizationId) {
		if ( !organizationId ) {
			FlowRouter.go(ROUTES_CONFIG.dashboard.list.name)
		}

		let organization;

		try {
			organization = await Meteor.callPromise(ORGANIZATION_SERVER_METHODS.getOrganizationById, { id: organizationId });
		} catch ( err ) {
			// todo: add notify service
			console.error(err.message);
			FlowRouter.go(ROUTES_CONFIG.dashboard.list.name);
		}

		if (_.isEmpty(organization)) {
            console.error('No organization found');
            FlowRouter.go(ROUTES_CONFIG.dashboard.list.name);
        }

		return organization
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