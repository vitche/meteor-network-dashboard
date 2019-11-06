import { Mongo } from 'meteor/mongo';
import { TasksSchema } from './tasks.schema';

class TasksModelServer {
	constructor() {
		this.collection = new Mongo.Collection('tasks');
		this.collection.attachSchema(TasksSchema);
	}
	
	insert(task) {
		return this.collection.insert(task)
	}
	
	find(query = {}) {
		return this.collection.find(query)
	}
	
	findAll() {
		return this.collection.find();
	}
	
	findById(id) {
		return this.collection.find({ _id: id })
	}
}

export const TasksModel = new TasksModelServer();