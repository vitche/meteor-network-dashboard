import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './tasks-list.page.html';
import { ModalService } from '../../../../ui-modal/client/service/modal.service';
import { TASK_EXECUTOR_TYPES, TASK_TIME_EXECUTE_TYPES } from '../../../both/tasks.enums';
import { TasksService } from '../../services/tasks.service';

import * as _ from 'lodash';

Template.Tasks_page.onCreated(async function () {
	this.state = new ReactiveDict();
	this.state.set('isLoading', true);
	
	try {
		const tasksList = await TasksService.getTasksList();
		this.state.set('tasks', tasksList);
		this.state.set('isLoading', false);
	} catch ( err ) {
		console.err(err);
		this.state.set('isLoading', false);
	}
	
});

Template.Tasks_page.helpers({
	isLoading: function () {
		return Template.instance().state.get('isLoading');
	},
	tasksList: function () {
		return Template.instance().state.get('tasks');
	},
	executorType: function (type) {
		return TASK_EXECUTOR_TYPES[type].title
	},
	taskTimeType: function (type) {
		return TASK_TIME_EXECUTE_TYPES[type].title
	},
	assignTo: function (user) {
		if ( !user || _.isEmpty(user) ) return '';
		return `${ user.profile.firstName } ${ user.profile.lastName }`;
	}
});

Template.Tasks_page.events({
	'click .js-create-task': async function (event, template) {
		ModalService.createTask();
	}
});