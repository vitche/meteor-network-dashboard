import { TasksModel } from '../../../models/tasks/server/tasks.model';
import { ClusterModel } from '../../../models/clusters/server/clusters.model';
import { GroupsCollection } from '../../../groups/both/groups.schema';
import { TASK_STATUSES } from '../../both/tasks.enums';

export const doneTask = async (taskId) => {
	let task;
	try {
		task = TasksModel.findTaskWithOrgAndCreator(taskId);
		
		await ClusterModel.update(task.clusterId, {
			$set: {
				archived: true
			}
		});
		
		await GroupsCollection.update({ _id: task.groupId }, {
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
		throw new Meteor.Error(400, err.message)
	}
	
	return { ...task, status: TASK_STATUSES.done.alias }
};