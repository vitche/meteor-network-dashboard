import { CLUSTER_METHODS_DICT } from '../../both/methods-dict';

class ClusterServiceClass {
	constructor() {
	}

	async createCluster(title) {
		return await Meteor.callPromise(CLUSTER_METHODS_DICT.createCluster, { title });
	}

}

export const ClusterService = new ClusterServiceClass();