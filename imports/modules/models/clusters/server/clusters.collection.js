import { Mongo } from 'meteor/mongo';
import { ClustersSchema } from './clusters.schema';

export const ClustersCollection = new Mongo.Collection('clusters');

ClustersCollection.attachSchema(ClustersSchema);