import { Mongo } from 'meteor/mongo';

class TasksCollectionClient {
	constructor() {
		this.collection = new Mongo.Collection('tasks');
	}

	find() {
		return this.collection.find();
	}
}

export const TasksCollection = new TasksCollectionClient();