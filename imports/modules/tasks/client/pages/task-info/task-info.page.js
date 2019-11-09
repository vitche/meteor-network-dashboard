import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './task-info.page.html';
import { TASKS_ROUTES } from '../../../both/tasks.routes';
import { TasksService } from '../../services/tasks.service';

Template.Task_info.onCreated(function () {
	this.state = new ReactiveDict();
	const taskId = FlowRouter.getParam('id');
	
	this.loadTask = async () => {
		if ( !taskId ) {
			console.log('here');
			FlowRouter.go(TASKS_ROUTES.list.path);
			return;
		}
		
		this.state.set('isLoading', true);
		
		try {
			const task = await TasksService.getTask(taskId);
			console.log(task);
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
	}
});

Template.Task_info.events({});