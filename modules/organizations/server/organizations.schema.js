import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Organizations = new Mongo.Collection('organizations');

Organizations.schema = new SimpleSchema({
	title: { type: String, max: 100 },
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

Organizations.attachSchema(Organizations.schema);