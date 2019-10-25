import { Mongo } from 'meteor/mongo';
import { ClustersSchema } from './clusters.schema';

class ClusterServer {
	constructor() {
		this.collection = new Mongo.Collection('clusters');
		this.collection.attachSchema(ClustersSchema);
	}

	async insert(query) {
		return await this.collection.insert(query);
	}

	findById(id) {
		return this.collection.find({ _id: id });
	}

}

export const ClusterModel = new ClusterServer();