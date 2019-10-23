import { Mongo } from 'meteor/mongo';

class ClusterClient {
	constructor() {
		this.collection = new Mongo.Collection('clusters');
	}

}

export const ClusterCollection = new ClusterClient();

