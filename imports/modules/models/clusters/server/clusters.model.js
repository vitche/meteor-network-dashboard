import { Mongo } from 'meteor/mongo';
import { ClustersSchema } from './clusters.schema';

class ClusterServer {
	constructor() {
		this.collection = new Mongo.Collection('clusters');
		this.collection.attachSchema(ClustersSchema);
	}

	insert(query) {
		return this.collection.insert(query);
	}

	findById(id) {
		return this.collection.find({ _id: id });
	}

	findAll() {
		return this.collection.find();
	}

}

export const ClusterModel = new ClusterServer();