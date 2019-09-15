import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Groups = new Mongo.Collection('groups');

Groups.schema = new SimpleSchema({
	title: { type: String, max: 100 },
	parentId: { type: Mongo.Collection.ObjectID },
	organizationId: { type: Mongo.Collection.ObjectID },
	permissions: { type: Array },
	'permissions.$': { type: String },
});