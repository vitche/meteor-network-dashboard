import { Mongo } from 'meteor/mongo';
import { OrganizationsSchema } from './organization.schema';

export const OrganizationCollection = new Mongo.Collection('organizations');

OrganizationsCollection.attachSchema(OrganizationsSchema);
