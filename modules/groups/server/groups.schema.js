import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Groups = new Mongo.Collection('groups');

Groups.schema = new SimpleSchema({
	title: { type: String, max: 100 },
	parentId: { type: String },
	organizationId: { type: String },
	permissions: { type: Array },
	'permissions.$': { type: String },
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