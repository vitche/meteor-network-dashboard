import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const GroupsCollection = new Mongo.Collection('groups');

if ( Meteor.isServer ) {
	GroupsCollection.rawCollection().createIndex({ parentGroupId: 1 });
}

const GroupsSchema = new SimpleSchema({
	title: { type: String, max: 100, optional: true },
	alias: { type: String, optional: true },
	parentGroupId: { type: String, optional: true },
	organizationId: { type: String, optional: true },
	taskId: { type: String, optional: true },
	clusters: { type: Array, optional: true },
	'clusters.$': { type: String },
	permissions: { type: Array, optional: true },
	'permissions.$': { type: String },
	archived: { type: Boolean, optional: true },
	createdAt: {
		type: Date,
		autoValue() {
			if ( this.isInsert ) {
				return new Date();
			} else if ( this.isUpsert ) {
				return { $setOnInsert: new Date() };
			} else {
				this.unset();
			}
		},
	},
});

GroupsCollection.attachSchema(GroupsSchema);