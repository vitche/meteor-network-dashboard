import { TASK_EXECUTOR_TYPES } from '../../../tasks/both/tasks.enums';
import { TasksCollection } from './tasks-collection.server';

const aggregateTaskWithCreatorAndOrganization = [
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
		$lookup: {
			from: 'users',
			localField: 'assignTo',
			foreignField: '_id',
			as: 'assignTo'
		}
	},
	{
		$unwind: {
			path: '$assignTo',
			'preserveNullAndEmptyArrays': true
		}
	},
];

export class TasksModelServer {
	constructor(collection) {
		this.collection = collection;
	}
	
	insert(task) {
		return this.collection.insert(task)
	}
	
	update(entityId, query) {
		return this.collection.update({ _id: entityId }, query);
	}
	
	find(query = {}) {
		return this.collection.find(query)
	}
	
	async findAll() {
		let tasks;
		try {
			tasks = await this.collection.rawCollection().aggregate([ ...aggregateTaskWithCreatorAndOrganization ]).toArray()
		} catch ( err ) {
			console.error(err)
		}
		
		return tasks;
	}
	
	findById(id) {
		return this.collection.findOne({ _id: id })
	}
	
	findTasksForOrganizationOwner(organizationId) {
		return this.collection.rawCollection().aggregate([
			...aggregateTaskWithCreatorAndOrganization,
			{
				$match: {
					$or: [
						{ executorType: TASK_EXECUTOR_TYPES.public.alias },
						{ organizationId: organizationId, }
					]
				}
			}
		]).toArray();
	}
	
	async findTasksForOrganizationMember(organizationId) {
		return this.collection.rawCollection().aggregate([
			...aggregateTaskWithCreatorAndOrganization,
			{
				$match: {
					$and: [
						{ executorType: { $in: [ TASK_EXECUTOR_TYPES.organization.alias, TASK_EXECUTOR_TYPES.public.alias ] } },
						{ organizationId: organizationId, }
					]
				}
			}
		]).toArray();
	}
	
	async findPublicTasks() {
		return this.collection.rawCollection().aggregate([
			...aggregateTaskWithCreatorAndOrganization,
			{
				$match: {
					executorType: TASK_EXECUTOR_TYPES.public.alias
				}
			}
		]).toArray();
	}
	
	async findTaskWithOrgAndCreator(id) {
		let task = await this.collection.rawCollection().aggregate([
			...aggregateTaskWithCreatorAndOrganization,
			{
				$match: { _id: id }
			}
		]).toArray();
		
		return task.length ? task[0] : {};
	}
}

export const TasksModel = new TasksModelServer(TasksCollection);