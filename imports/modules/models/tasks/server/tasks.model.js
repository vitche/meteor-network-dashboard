import { TASK_EXECUTOR_TYPES } from '../../../tasks/both/tasks.enums';
import { TasksCollection } from './tasks-collection.server';

export class TasksModelServer {
	constructor(collection) {
		this.collection = collection;
	}
	
	insert(task) {
		return this.collection.insert(task)
	}
	
	find(query = {}) {
		return this.collection.find(query)
	}
	
	findAll() {
		return this.collection.find();
	}
	
	findById(id) {
		return this.collection.findOne({ _id: id })
	}
	
	findTasksForOrganizationOwner(organizationId) {
		return this.collection.find({
			$or: [
				{ executorType: TASK_EXECUTOR_TYPES.public.alias },
				{ organizationId: organizationId, }
			]
		});
	}
	
	findTasksForOrganizationMember(organizationId) {
		return this.collection.find({
			$and: [
				{ executorType: { $in: [ TASK_EXECUTOR_TYPES.organization.alias, TASK_EXECUTOR_TYPES.public.alias ] } },
				{ organizationId: organizationId, }
			],
			
		});
	}
	
	findPublicTasks() {
		return this.collection.find({
			executorType: TASK_EXECUTOR_TYPES.public.alias
		})
	}
	
	async findTaskWithOrgAndCreator(id) {
		let task = await this.collection.rawCollection().aggregate([
			{
				$lookup: {
					from: 'users',
					localField: 'creatorId',
					foreignField: '_id',
					as: 'creator'
				}
			},
			{
				$unwind: '$creator'
			},
			{
				$lookup: {
					from: 'organizations',
					localField: 'organizationId',
					foreignField: '_id',
					as: 'organization'
				}
			},
			{
				$unwind: '$organization'
			},
			{
				$match: {_id: id}
			}
		]).toArray();
		
		return task.length ? task[0] : {};
	}
}

export const TasksModel = new TasksModelServer(TasksCollection);