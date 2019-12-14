// import StubCollections from 'meteor/hwillson:stub-collections';
// import { TasksCollection } from '../../../models/tasks/server/tasks-collection.server';
// import { GroupsCollection } from '../../../models/groups/server/group.schema';
// import { UsersCollection } from '../../../users/both/users.schema';
// import { TASK_EXECUTOR_TYPES, TASK_STATUSES, TASK_TIME_EXECUTE_TYPES } from '../../both/tasks.enums';
// import { TasksModelServer } from '../../../models/tasks/server/tasks.model';
// import { ClustersCollection } from '../../../models/clusters/server/clusters.collection';
// import { runTask } from './runTask';
// import { PERMISSIONS_ENUM } from '../../../../configs/permissions/permissions.enum';
//
// const assert = require('chai').assert;
// const faker = require('faker');
//
// const organizationId_1 = faker.random.uuid();
// const creatorId_1 = faker.random.uuid();
// const assignTo_1 = faker.random.uuid();
// const deviceId_1 = faker.random.uuid();
//
// const task1 = {
// 	title: faker.lorem.sentence(),
// 	description: faker.lorem.sentences(),
// 	time: {
// 		type: TASK_TIME_EXECUTE_TYPES.estimated.alias,
// 		estimate: 10
// 	},
// 	executorType: TASK_EXECUTOR_TYPES.public.alias,
// 	creatorId: creatorId_1,
// 	assignTo: assignTo_1,
// 	organizationId: organizationId_1,
// 	devicesId: deviceId_1
// };
//
// describe('Run Task', function () {
//
// 	let model;
//
// 	beforeEach(() => {
// 		StubCollections.stub(TasksCollection);
// 		StubCollections.stub(ClustersCollection);
// 		StubCollections.stub(GroupsCollection);
// 		StubCollections.stub(UsersCollection);
// 		model = new TasksModelServer(TasksCollection);
// 		UsersCollection.insert({
// 			_id: assignTo_1,
// 			emails: [ { address: 'executor@gmail.com' } ]
// 		});
//
// 		UsersCollection.insert({
// 			_id: creatorId_1,
// 			emails: [ { address: 'creator@gmail.com' } ]
// 		})
// 	});
//
// 	afterEach(() => {
// 		StubCollections.restore();
// 	});
//
// 	it('should find user which assign to task', async function () {
// 		const users = await UsersCollection.find().fetch();
// 		assert.lengthOf(users, 2)
// 	});
//
// 	it('should runTask', async function () {
// 		const taskId = await TasksCollection.insert(task1);
// 		await runTask(taskId);
//
// 		const groups = await GroupsCollection.find().fetch();
// 		const clusters = await ClustersCollection.find().fetch();
// 		const task = await TasksCollection.find({ _id: taskId }).fetch();
// 		const assignedUser = await UsersCollection.find({ _id: assignTo_1 }).fetch();
//
// 		assert.lengthOf(groups, 1);
// 		assert.lengthOf(clusters, 1);
// 		assert.lengthOf(task, 1);
// 		assert.lengthOf(assignedUser, 1);
// 	});
//
// 	it('should be connection between group, cluster and task', async () => {
// 		const taskId = await TasksCollection.insert(task1);
// 		await runTask(taskId);
//
// 		const group = await GroupsCollection.find().fetch()[0];
// 		const cluster = await ClustersCollection.find().fetch()[0];
//
// 		assert.equal(group.clusters.length, 1);
// 		assert.equal(group.taskId, taskId);
// 		assert.equal(group.clusters[0], cluster._id);
// 	});
//
// 	it('should be connection between cluster, group and and task', async () => {
// 		const taskId = await TasksCollection.insert(task1);
// 		await runTask(taskId);
//
// 		const group = await GroupsCollection.find().fetch()[0];
// 		const cluster = await ClustersCollection.find().fetch()[0];
//
// 		assert.equal(cluster.taskId, taskId);
// 		assert.equal(cluster.groupId, group._id);
// 	});
//
// 	it('should task has connection with cluster and group', async () => {
// 		const taskId = await TasksCollection.insert(task1);
// 		await runTask(taskId);
//
// 		const group = await GroupsCollection.find().fetch()[0];
// 		const cluster = await ClustersCollection.find().fetch()[0];
// 		const task = await TasksCollection.findOne(taskId);
//
// 		assert.equal(task.clusterId, cluster._id);
// 		assert.equal(task.groupId, group._id);
// 	});
//
// 	it('should task has status in progress', async () => {
// 		const taskId = await TasksCollection.insert(task1);
// 		await runTask(taskId);
//
// 		const task = await TasksCollection.findOne(taskId);
//
// 		assert.equal(task.status, TASK_STATUSES.inProgress.alias);
// 	});
//
// 	it('should estimated task has time range', async () => {
// 		const taskId = await TasksCollection.insert(task1);
// 		await runTask(taskId);
//
// 		const task = await TasksCollection.findOne(taskId);
//
// 		assert.isNotNull(task.time.startDate);
// 		assert.isNotNull(task.time.endDate);
// 	});
//
// 	it('user must consist of group and has permissions of group  ', async () => {
// 		const taskId = await TasksCollection.insert(task1);
// 		await runTask(taskId);
//
// 		const user = await UsersCollection.find(assignTo_1).fetch()[0];
// 		const group = await GroupsCollection.find().fetch()[0];
// 		console.log(user);
// 		assert.exists(user.roles[group._id]);
// 		assert.sameMembers(user.roles[group._id], [ PERMISSIONS_ENUM.read.alias, PERMISSIONS_ENUM.write.alias ]);
// 	})
//
//
// });