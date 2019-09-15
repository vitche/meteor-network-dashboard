import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Organizations = new Mongo.Collection('organizations');

Organizations.schema = new SimpleSchema({
	title: { type: String, max: 100 },
	verified: { type: Boolean, defaultValue: false },
});

Organizations.attachSchema(Organizations.schema);