import { TasksModel } from '../../../models/tasks/server/tasks.model';
import { ClusterModel } from '../../../models/clusters/server/clusters.model';
import { TASK_STATUSES } from '../../both/tasks.enums';
import { GroupModel } from '../../../models/groups/server/group.model';

export const doneTask = async (taskId) => {
	let task;
	try {
		task = await TasksModel.findTaskWithOrgAndCreator(taskId);
		
		await ClusterModel.update(task.clusterId, {
			$set: {
				archived: true
			}
		});
		
		await GroupModel.update({ _id: task.groupId }, {
			$set: {
				archived: true
			}
		});
		
		await TasksModel.update(taskId, {
			$set: {
				status: TASK_STATUSES.done.alias
			}
		})
	} catch ( err ) {
		console.log(err);
		throw new Meteor.Error(400, err.message)
	}
	
	return { ...task, status: TASK_STATUSES.done.alias }
};