import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './task-info.page.html';
import './task-info.page.css';

import { TASKS_ROUTES } from '../../../both/tasks.routes';
import { TasksService } from '../../services/tasks.service';
import { TASK_EXECUTOR_TYPES, TASK_STATUSES, TASK_TIME_EXECUTE_TYPES } from '../../../both/tasks.enums';
import { UserService } from '../../../../users/client/service/user.service';

Template.Task_info.onCreated(function () {
	this.state = new ReactiveDict();
	const taskId = FlowRouter.getParam('id');
	
	this.loadTask = async () => {
		if ( !taskId ) {
			FlowRouter.go(TASKS_ROUTES.list.path);
			return;
		}
		
		this.state.set('isLoading', true);
		
		try {
			let assignUser;
			const task = await TasksService.getTaskWithOrgAndCreator(taskId);
			
			if ( task.assignTo ) {
				assignUser = await UserService.findUserById(task.assignTo);
				this.state.set('assignUser', assignUser)
			}
			
			this.state.set('task', task);
			this.state.set('isLoading', false);
		} catch ( err ) {
			console.log(err)
		}
	};
	
	this.loadTask();
});

Template.Task_info.helpers({
	isLoading: function () {
		return Template.instance().state.get('isLoading');
	},
	task: function () {
		return Template.instance().state.get('task');
	},
	taskExecutorTitle: function(type) {
		return 	TASK_EXECUTOR_TYPES[type].title;
	},
	isOpenTask: function (status) {
		return status === TASK_STATUSES.open.alias;
	},
	isInProgressTask: function (status) {
		return status === TASK_STATUSES.inProgress.alias;
	},
	taskStatus: function (status) {
		return TASK_STATUSES[status].title;
	},
	taskTimeType: function(timeType) {
		return 	TASK_TIME_EXECUTE_TYPES[timeType].title;
	},
	isTaskEstimated: function (timeType) {
		return timeType === TASK_TIME_EXECUTE_TYPES.estimated.alias
	},
	isTaskScheduled: function (timeType) {
		return timeType === TASK_TIME_EXECUTE_TYPES.scheduled.alias
	},
	isTaskByComplete: function (timeType) {
		return timeType === TASK_TIME_EXECUTE_TYPES.byComplete.alias
	},
	assignedUser: function () {
		const user = Template.instance().state.get('assignUser');
		if ( user ) {
			return `${user.profile.firstName} ${user.profile.lastName}`;
		}
		return '';
	}
});

Template.Task_info.events({});