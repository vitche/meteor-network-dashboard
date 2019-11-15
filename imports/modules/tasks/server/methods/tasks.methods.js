import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { TASKS_METHODS_DICT } from '../../both/tasks.methods-dict';
import { Mixins } from '../../../../helpers/server/mixins';
import { ROLES_DICTIONARY } from '../../../../configs/roles/roles.dictionary';
import { createTask } from '../functions/createTask';
import { TasksModel } from '../../../models/tasks/server/tasks.model';
import { runTask } from '../functions/runTask';
import { assignCurrentUser } from '../functions/assignCurrentUser';

export const createTaskMethod = new ValidatedMethod({
	name: TASKS_METHODS_DICT.createTask,
	mixins: [ Mixins.loggedIn, Mixins.roles ],
	roles: [
		ROLES_DICTIONARY.private.superAdmin.alias,
		ROLES_DICTIONARY.private.organizationOwner
	],
	validate: new SimpleSchema({
		title: { type: String, max: 250 },
		description: { type: String, max: 10000, optional: true },
		time: { type: Object },
		'time.type': { type: String },
		'time.startDate': { type: Date, optional: true },
		'time.endDate': { type: Date, optional: true },
		'time.estimate': { type: Number, optional: true },
		'time.prolongation': { type: Boolean, defaultValue: false },
		executorType: { type: String },
		devicesId: { type: Array },
		'devicesId.$': { type: String },
		assignTo: { type: String, optional: true },
		priceRate: { type: Number, optional: true },
	}).validator(),
	async run(task) {
		return await createTask(task);
	}
});

export const getTaskById = new ValidatedMethod({
	name: TASKS_METHODS_DICT.getTaskById,
	mixins: [ Mixins.loggedIn ],
	validate: new SimpleSchema({
		taskId: { type: String },
	}).validator(),
	async run({ taskId }) {
		let task;
		try {
			task = await TasksModel.findById(taskId)
		} catch ( err ) {
			console.error(err);
			throw new Meteor.Error(400, err.message);
		}
		return task;
	}
});

export const getTaskWithOrgAndCreator = new ValidatedMethod({
	name: TASKS_METHODS_DICT.getTaskWithOrgAndCreator,
	mixins: [ Mixins.loggedIn ],
	validate: new SimpleSchema({
		taskId: { type: String },
	}).validator(),
	async run({ taskId }) {
		let task;
		try {
			task = await TasksModel.findTaskWithOrgAndCreator(taskId);
		} catch ( err ) {
			console.error(err);
			throw new Meteor.Error(400, err.message);
		}
		return task;
	}
});

export const runTaskMethod = new ValidatedMethod({
	name: TASKS_METHODS_DICT.runTask,
	mixin: [ Mixins.loggedIn ],
	validate: new SimpleSchema({
		taskId: { type: String },
	}).validator(),
	async run({ taskId }) {
		return await runTask(taskId)
	}
});

export const assignCurrentUserMethod = new ValidatedMethod({
	name: TASKS_METHODS_DICT.assignCurrentUser,
	mixin: [ Mixins.loggedIn ],
	validate: new SimpleSchema({
		taskId: { type: String },
	}).validator(),
	async run({ taskId }) {
		return await assignCurrentUser(taskId)
	}
});