import { Meteor } from 'meteor/meteor';
import { TASKS_METHODS_DICT } from '../../both/tasks.methods-dict';
import { ORGANIZATION_SERVER_METHODS } from '../../../organizations/both/organizations.methods';

class TasksServiceClass {
	constructor() {
	}
	
	async createTask(task) {
		let taskId;
		try {
			taskId = await Meteor.callPromise(TASKS_METHODS_DICT.createTask, task);
		} catch ( err ) {
			console.error(err)
		}
		return taskId
	}
	
	async getTask(taskId) {
		const task = await Meteor.callPromise(TASKS_METHODS_DICT.getTaskById, { taskId });
		return task.length && task[0];
	}
	
	getTaskWithOrgAndCreator(taskId) {
		return Meteor.callPromise(TASKS_METHODS_DICT.getTaskWithOrgAndCreator, { taskId });
	}
	
	async getOrganizationMembers() {
		return await Meteor.callPromise(ORGANIZATION_SERVER_METHODS.getOrganizationMembers);
	}
	
}

export const TasksService = new TasksServiceClass();