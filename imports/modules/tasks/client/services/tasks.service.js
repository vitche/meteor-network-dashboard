import { Meteor } from 'meteor/meteor';
import { TASKS_METHODS_DICT } from '../../both/tasks.methods-dict';

class TasksServiceClass {
	constructor() {
	}
	
	async createTask(task) {
		return Meteor.callPromise(TASKS_METHODS_DICT.createTask, task);
	}
}

export const TasksService = new TasksServiceClass();