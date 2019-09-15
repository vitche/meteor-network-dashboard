import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Mongo } from "meteor/mongo";

Meteor.users.allow({
	insert: () => false,
	update: () => false,
	remove: () => false,
});

Meteor.users.deny({
	insert: () => true,
	update: () => true,
	remove: () => true,
});

const UserSchema = new SimpleSchema({
	emails: { type: Array},
	'emails.$': { type: Object},
	'emails.$.address': { type: String, regEx: SimpleSchema.RegEx.Email },
	'emails.$.verified': { type: Boolean },
	'emails.$.primary': { type: Boolean, optional: true },
	profile: { type: Object },
	'profile.firstName': { type: String },
	'profile.lastName': { type: String },
	'profile.organizationId': { type: Mongo.Collection.ObjectID, optional: true },
	roles: { type: Object, optional: true, blackbox: true },
});

Meteor.users.attachSchema(UserSchema);