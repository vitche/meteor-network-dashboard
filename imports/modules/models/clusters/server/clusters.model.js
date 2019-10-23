import { Mongo } from 'meteor/mongo';
import { ClustersSchema } from './clusters.schema';

class ClusterServer {
	constructor() {
		this.collection = new Mongo.Collection('clusters');
		this.collection.attachSchema(ClustersSchema);
	}

	async insert(title, organizationId) {
		const clusterId = await this.collection.insert({ title, organizationId });
		return this.findById(clusterId);
	}

	findById(id) {
		return this.collection.find({ _id: id });
	}

}

export const ClusterModule = new ClusterServer();