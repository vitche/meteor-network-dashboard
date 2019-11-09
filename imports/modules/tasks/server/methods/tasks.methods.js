import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { TASKS_METHODS_DICT } from '../../both/tasks.methods-dict';
import { Mixins } from '../../../../helpers/server/mixins';
import { ROLES_DICTIONARY } from '../../../../configs/roles/roles.dictionary';
import { createTask } from '../functions/createTask';
import { TasksModel } from '../../../models/tasks/server/tasks.model';

export const createTaskMethod = new ValidatedMethod({
	name: TASKS_METHODS_DICT.createTask,
	mixins: [ Mixins.loggedIn, Mixins.roles ],
	roles: [
		ROLES_DICTIONARY.private.superAdmin.alias,
		ROLES_DICTIONARY.private.organizationOwner
	],
	validate: new SimpleSchema({
		title: { type: String, max: 250 },
		description: { type: String, max: 1000, optional: true },
		time: { type: Object },
		'time.startDate': { type: Date },
		'time.endDate': { type: Date },
		executorType: { type: String },
		assignTo: {type: String, optional: true},
		priceRate: { type: Number, optional: true },
		prolongation: { type: Boolean }
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