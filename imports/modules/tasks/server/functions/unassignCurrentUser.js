import { TasksModel } from '../../../models/tasks/server/tasks.model';
import { TASK_STATUSES } from '../../both/tasks.enums';

export const unassignCurrentUser = async (taskId) => {
	let task;
	
	task = await TasksModel.findTaskWithOrgAndCreator(taskId);
	
	if ( task.status === TASK_STATUSES.inProgress.alias || task.status === TASK_STATUSES.done.alias ) {
		throw new Meteor.Error(400, `You can't unassign user while task in ${ TASK_STATUSES[task.status].title } status`);
	}
	
	try {
		await TasksModel.update(taskId, {
			$set: {
				assignTo: null
			}
		});
		
		
	} catch ( err ) {
		throw new Meteor.Error('update-task', 'Can not assign user to task')
	}
	
	return { ...task, assignTo: null };
};