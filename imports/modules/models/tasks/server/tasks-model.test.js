import StubCollections from 'meteor/hwillson:stub-collections';
const assert = require('chai').assert;
const faker = require('faker');

import { TASK_EXECUTOR_TYPES, TASK_TIME_EXECUTE_TYPES } from '../../../tasks/both/tasks.enums';
import { TasksCollection } from './tasks-collection.server';
import { TasksModelServer } from './tasks.model';

const organizationId_1 = faker.random.uuid();
const organizationId_2 = faker.random.uuid();

const tasksFakeList = {
	task1: {
		title: faker.lorem.sentence(),
		description: faker.lorem.sentences(),
		time: {
			type: TASK_TIME_EXECUTE_TYPES.estimated.alias,
			estimate: 10
		},
		executorType: TASK_EXECUTOR_TYPES.public.alias,
		creatorId: faker.random.uuid(),
		organizationId: organizationId_1
	},
	task2: {
		title: faker.lorem.sentence(),
		description: faker.lorem.sentences(),
		time: {
			type: TASK_TIME_EXECUTE_TYPES.estimated.alias,
			estimate: 10
		},
		executorType: TASK_EXECUTOR_TYPES.public.alias,
		creatorId: faker.random.uuid(),
		organizationId: organizationId_2
	},
	task3: {
		title: faker.lorem.sentence(),
		description: faker.lorem.sentences(),
		time: {
			type: TASK_TIME_EXECUTE_TYPES.estimated.alias,
			estimate: 10
		},
		executorType: TASK_EXECUTOR_TYPES.organization.alias,
		creatorId: faker.random.uuid(),
		organizationId: organizationId_1
	},
	task4: {
		title: faker.lorem.sentence(),
		description: faker.lorem.sentences(),
		time: {
			type: TASK_TIME_EXECUTE_TYPES.estimated.alias,
			estimate: 10
		},
		executorType: TASK_EXECUTOR_TYPES.organization.alias,
		creatorId: faker.random.uuid(),
		organizationId: organizationId_2
	},
	task5: {
		title: faker.lorem.sentence(),
		description: faker.lorem.sentences(),
		time: {
			type: TASK_TIME_EXECUTE_TYPES.estimated.alias,
			estimate: 10
		},
		executorType: TASK_EXECUTOR_TYPES.platform.alias,
		creatorId: faker.random.uuid(),
		organizationId: organizationId_1
	},
	task6: {
		title: faker.lorem.sentence(),
		description: faker.lorem.sentences(),
		time: {
			type: TASK_TIME_EXECUTE_TYPES.estimated.alias,
			estimate: 10
		},
		executorType: TASK_EXECUTOR_TYPES.platform.alias,
		creatorId: faker.random.uuid(),
		organizationId: organizationId_2
	}
};

describe('Task Model', function() {
	
	let model;
	
	beforeEach(() => {
		StubCollections.stub(TasksCollection);
		model = new TasksModelServer(TasksCollection);
		model.insert(tasksFakeList.task1);
		model.insert(tasksFakeList.task2);
		model.insert(tasksFakeList.task3);
		model.insert(tasksFakeList.task4);
		model.insert(tasksFakeList.task5);
		model.insert(tasksFakeList.task6);
	});
	
	afterEach(() => {
		StubCollections.restore();
	});
	
	it('should find 5 tasks', async function () {
		const tasks = await model.findAll().fetch();
		assert.lengthOf(tasks, 6)
	});
	
	it('should find all tasks created by organization 1', async () => {
		const tasks = await model.findTasksForOrganizationOwner(organizationId_1).fetch();
		assert.lengthOf(tasks, 4)
	});
	
	it('should find all tasks of organization 1 only for members', async () => {
		const tasks = await model.findTasksForOrganizationMember(organizationId_1).fetch();
		assert.lengthOf(tasks, 2);
		assert.equal(tasks[0].organizationId, organizationId_1);
		assert.equal(tasks[1].organizationId, organizationId_1);
	});
	
	it('should find all public tasks of both organizations', async () => {
		const tasks = await model.findPublicTasks(organizationId_1).fetch();
		const ids = tasks.map((task) => task.organizationId);
		
		assert.lengthOf(tasks, 2);
		assert.include(ids, organizationId_1);
		assert.include(ids, organizationId_2);
	});
});