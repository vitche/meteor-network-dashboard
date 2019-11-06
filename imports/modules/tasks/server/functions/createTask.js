import { TasksModel } from '../../../models/tasks/server/tasks.model';

export const createTask = async (task) => {
	// todo: move it to User Modal
	const user = Meteor.user();
	
	if ( !user ) {
		throw new Meteor.Error(403, 'User has not been authenticated');
	}
	
	task = { ...task, ...{ organizationId: user.profile.organizationId, creatorId: user._id } };
	
	let taskId;
	
	try {
		taskId = await TasksModel.insert(task);
	} catch ( err ) {
		// todo: move it to Error handler
		throw new Meteor.Error(400, err.message);
	}
	
	return taskId;
};