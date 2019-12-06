import { Meteor } from 'meteor/meteor';
import { TasksModel } from '../../../models/tasks/server/tasks.model';
import { ClusterModel } from '../../../models/clusters/server/clusters.model';
import { PERMISSIONS_ENUM } from '../../../../configs/permissions/permissions.enum';
import { RolesService } from '../../../roles/server/services/roles.service';
import { TASK_STATUSES, TASK_TIME_EXECUTE_TYPES } from '../../both/tasks.enums';
import { GroupModel } from '../../../models/groups/server/group.model';

const moment = require('moment');

export const runTask = async (taskId) => {
	let task;
	try {
		// get a task;
		task = await TasksModel.findById(taskId);
		
		// create a cluster
		const clusterId = await ClusterModel.insert({
			taskId: task._id,
			organizationId: task.organizationId,
			devicesId: task.devicesId
		});
		
		// create a group
		const groupId = await GroupModel.insert({
			taskId: task._id,
			organizationId: task.organizationId,
			clusters: [ clusterId ],
			permission: [ PERMISSIONS_ENUM.read, PERMISSIONS_ENUM.write ]
		});
		
		// connect cluster with group
		await ClusterModel.update(clusterId, {
			$set: {
				groupId: groupId
			}
		});
		
		// assign the executor of task to group
		RolesService.setUserPermissions(task.assignTo, [ PERMISSIONS_ENUM.read.alias, PERMISSIONS_ENUM.write.alias ], groupId);
		
		task.time = { ...task.time, ...calculateEstimatedTaskTimeRange(task.time) };
		
		await TasksModel.update(taskId, {
			$set: {
				groupId,
				clusterId,
				status: TASK_STATUSES.inProgress.alias,
				'time.startDate': task.time.startDate,
				'time.endDate': task.time.endDate,
			}
		});
		
		// TODO: return just simple task or rich the task model with creator and organization data
		task = TasksModel.findTaskWithOrgAndCreator(taskId);
		
	} catch ( err ) {
		console.error('error : ', err);
		throw new Meteor.Error(400, err.message);
	}
	
	return task;
};

function calculateEstimatedTaskTimeRange(taskTime) {
	if ( taskTime.type === TASK_TIME_EXECUTE_TYPES.estimated.alias ) {
		const startDate = moment().toISOString();
		const endDate = moment(startDate).add(taskTime.estimate, 'h').toISOString();
		return { ...taskTime, startDate, endDate };
	}
	
	return taskTime;
}