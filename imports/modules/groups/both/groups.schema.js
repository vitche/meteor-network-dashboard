import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const GroupsCollection = new Mongo.Collection('groups');

if (Meteor.isServer) {
	GroupsCollection.rawCollection().createIndex({ parentGroupId: 1 });
}

const GroupsSchema = new SimpleSchema({
	title: { type: String, max: 100 },
	alias: { type: String, optional: true },
	parentGroupId: { type: String, optional: true },
	organizationId: { type: String, optional: true },
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

GroupsCollection.attachSchema(GroupsSchema);