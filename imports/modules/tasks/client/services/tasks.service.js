import { TASKS_METHODS_DICT } from '../../both/tasks.methods-dict';

class TasksServiceClass {
	constructor() {
	}
	
	async createTask(task) {
		console.log(task);
		return await Meteor.callPromise(TASKS_METHODS_DICT.createTask, task );
	}
}

export const TasksService = new TasksServiceClass();