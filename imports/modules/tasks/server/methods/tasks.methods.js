import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { TASKS_METHODS_DICT } from '../../both/tasks.methods-dict';
import { Mixins } from '../../../../helpers/server/mixins';
import { ROLES_DICTIONARY } from '../../../../configs/roles/roles.dictionary';
import { createTask } from '../functions/createTask';

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
		priceRate: { type: Number },
		prolongation: {type: Boolean}
	}).validator(),
	async run( task ) {
		console.log('task : ', task);
		return await createTask(task);
	}
});