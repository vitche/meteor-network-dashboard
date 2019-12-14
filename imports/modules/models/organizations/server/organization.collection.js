import { Mongo } from 'meteor/mongo';
import { OrganizationsSchema } from './organization.schema';

export const OrganizationCollection = new Mongo.Collection('organizations');

OrganizationCollection.attachSchema(OrganizationsSchema);
