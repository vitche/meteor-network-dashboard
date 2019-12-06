import { Mongo } from 'meteor/mongo';
import { GroupSchema } from './group.schema';

export const GroupCollection = new Mongo.Collection('groups');

GroupCollection.attachSchema(GroupSchema);