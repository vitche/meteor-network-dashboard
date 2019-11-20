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
	
	async getTasksList() {
		return Meteor.callPromise(TASKS_METHODS_DICT.getTasksList);
	}
	
	async getTask(taskId) {
		const task = await Meteor.callPromise(TASKS_METHODS_DICT.getTaskById, { taskId });
		return task.length && task[0];
	}
	
	getTaskWithOrgAndCreator(taskId) {
		return Meteor.callPromise(TASKS_METHODS_DICT.getTaskWithOrgAndCreator, { taskId });
	}
	
	getOrganizationMembers() {
		const user = Meteor.user();
		if ( !user.profile.organizationId ) {
			return [];
		}
		return Meteor.callPromise(ORGANIZATION_SERVER_METHODS.getOrganizationMembers);
	}
	
	runTask(taskId) {
		return Meteor.callPromise(TASKS_METHODS_DICT.runTask, { taskId });
	}
	
	doneTask(taskId) {
		return Meteor.callPromise(TASKS_METHODS_DICT.doneTask, { taskId });
	}
	
	assignCurrentUser(taskId) {
		return Meteor.callPromise(TASKS_METHODS_DICT.assignCurrentUser, { taskId });
	}
	
	unassignCurrentUser(taskId) {
		return Meteor.callPromise(TASKS_METHODS_DICT.unassignCurrentUser, { taskId });
	}
	
}

export const TasksService = new TasksServiceClass();