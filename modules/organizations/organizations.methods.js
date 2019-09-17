import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Organizations } from './organizations.schema';

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
