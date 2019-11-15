import { ClustersCollection } from './clusters.collection';

class ClusterServer {
	constructor(collection) {
		this.collection = collection;
	}
	
	insert(query) {
		return this.collection.insert(query);
	}
	
	update(entityId, query) {
		return this.collection.update({_id: entityId}, query);
	}
	
	findById(id) {
		return this.collection.find({ _id: id });
	}
	
	findAll() {
		return this.collection.find();
	}
	
}

export const ClusterModel = new ClusterServer(ClustersCollection);