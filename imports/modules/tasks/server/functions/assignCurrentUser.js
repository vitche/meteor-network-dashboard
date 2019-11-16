import { TasksModel } from '../../../models/tasks/server/tasks.model';

export const assignCurrentUser = async (taskId) => {
	const user = Meteor.user();
	
	if ( !user || !user._id ) {
		throw new Meteor.Error(400, 'User not found');
	}
	
	let task;
	try {
		await TasksModel.update(taskId, {
			$set: {
				assignTo: user._id
			}
		});
		task = await TasksModel.findTaskWithOrgAndCreator(taskId);
		
	} catch (err) {
		throw new Meteor.Error('update-task', 'Can not assign user to task')
	}
	
	return task;
};