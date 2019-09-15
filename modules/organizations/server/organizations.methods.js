import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { _ } from 'meteor/underscore';

import { Organizations } from './organizations.schema';

const createOrganization = new ValidatedMethod({
	name: 'organization.create',
	validate: new SimpleSchema({
		title: { type: String },
		verified: { type: Boolean }
	}).validator(),
	run( organization) {
		console.log("in method : ", organization);
		return Organizations.insert(organization)
	},
});


export const OrganizationsMethods = {
	createOrganization
};
