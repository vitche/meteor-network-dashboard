import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Organizations } from './organizations.schema';

export const ORGANIZATION_SERVER_METHODS = {
	getOrganizationById: 'organization.methods.getOrganizationById',
	createOrganizationRequest: 'organization.methods.createOrganizationRequest',
	approveOrganization: 'organization.methods.approveOrganization',
	inviteUser: 'organization.methods.inviteUser',
	getOrganizationMembers: 'organization.methods.getOrganizationMembers'
};


const createOrganization = new ValidatedMethod({
	name: 'organization.create',
	validate: new SimpleSchema({
		title: { type: String }
	}).validator(),
	run(organization) {
		return Organizations.insert(organization)
	},
});

export const OrganizationsMethods = {
	createOrganization
};
