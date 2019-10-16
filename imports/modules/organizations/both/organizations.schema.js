import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const OrganizationsCollection = new Mongo.Collection('organizations');

const OrganizationsSchema = new SimpleSchema({
	title: { type: String, max: 100 },
	ownerId: { type: String },
	groupId: { type: String, optional: true },
	verified: { type: Boolean, defaultValue: false },
	createdAt: {
		type: Date,
		autoValue() {
			if (this.isInsert) {
				return new Date();
			} else if (this.isUpsert) {
				return { $setOnInsert: new Date() };
			} else {
				this.unset();
			}
		},
	},
});

OrganizationsCollection.attachSchema(OrganizationsSchema);