
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { TasksService } from '../../services/tasks.service';
import {
	TASK_EXECUTOR_TYPES,
	TASK_TIME_EXECUTE_TYPES
} from '../../../both/tasks.enums';

import './create-task.modal.html';
import './create-task.modal.css';
import { DEVICES_PUBLISH_ENUM } from '../../../../devices/both/devices.enum';
import { DevicesCollection } from '../../../../models/devices/client/devices.collections';

Template.Create_task_modal.onCreated(function () {
	this.state = new ReactiveDict();
	
	const devicesHandler = this.subscribe(DEVICES_PUBLISH_ENUM.getDevicesList);
	
	// TODO : add spinner
	this.autorun(() => {
		if (devicesHandler.ready()) {
			const devices = DevicesCollection.find().fetch();
			this.state.set('devices', devices);
		}
	})
	
});

Template.Create_task_modal.helpers({
	devices: function() {
		return Template.instance().state.get('devices');
	},
	hasError: function () {
		return Template.instance().state.get('hasError');
	},
	executorTypes: function () {
		return Object.keys(TASK_EXECUTOR_TYPES).map(key => TASK_EXECUTOR_TYPES[key]);
	},
	isOrganizationExecutor: function () {
		return Template.instance().state.get('executor') === TASK_EXECUTOR_TYPES.organization.alias;
	},
	isPublicExecutor: function () {
		return Template.instance().state.get('executor') === TASK_EXECUTOR_TYPES.public.alias;
	},
	timeExecuteTypes: function () {
		return Object.keys(TASK_TIME_EXECUTE_TYPES).map(key => TASK_TIME_EXECUTE_TYPES[key]);
	},
	isScheduled: function () {
		return Template.instance().state.get('timeExecuteType') === TASK_TIME_EXECUTE_TYPES.scheduled.alias
	},
	isEstimated: function () {
		return Template.instance().state.get('timeExecuteType') === TASK_TIME_EXECUTE_TYPES.estimated.alias
	},
	isByComplete: function () {
		return Template.instance().state.get('timeExecuteType') === TASK_TIME_EXECUTE_TYPES.byComplete.alias
	},
	members: function () {
		return Template.instance().state.get('members');
	}
});

Template.Create_task_modal.events({
	'change select[name=task-time-execute-type]': function (event, template) {
		const instance = Template.instance();
		const type = $('select[name=task-time-execute-type]').val();
		instance.state.set('timeExecuteType', type);
	},
	'change select[name=task-executor]': async function (event, template) {
		const instance = Template.instance();
		const type = $('select[name=task-executor]').val();
		instance.state.set('executor', type);
		
		if ( type === TASK_EXECUTOR_TYPES.organization.alias ) {
			let members = instance.state.get('members');
			
			if ( members && members.length ) return;
			
			instance.startLoading();
			try {
				const members = await TasksService.getOrganizationMembers();
				instance.state.set('members', members);
				instance.finishLoading();
			} catch ( err ) {
				instance.onError(err.message);
			}
		}
	},
	'click .js-save': async function (event, template) {
		event.preventDefault();
		
		const instance = Template.instance();
		const form = $('#crete-task-form');
		
		// TODO make getting info from all inputs more beautiful
		// console.log(form.serializeArray());
		
		const title = $('input[name=task-title]').val();
		const description = $('textarea[name=task-description]').val();
		
		const timeType = $('select[name=task-time-execute-type]').val();
		const startDate = $('input[name=task-start-date]').val() || null;
		const endDate = $('input[name=task-end-date]').val() || null;
		const estimate = $('input[name=task-estimate]').val() || null;
		const prolongation = $('input[type=\'checkbox\']').is(':checked');
		
		const executorType = $('select[name=task-executor]').val();
		const deviceId = $('select[name=task-device]').val();
		const assignTo = $('select[name=task-assign-to]').val() || null;
		const priceRate = $('input[name=task-rate]').val() || null;
		
		instance.startLoading();
		
		try {
			const taskId = await TasksService.createTask({
				title,
				description,
				time: { type: timeType, prolongation, ...timeParse(startDate, endDate, estimate) },
				executorType,
				assignTo,
				devicesId: [deviceId],
				priceRate: Number(priceRate),
			});
		} catch ( err ) {
			instance.onError(err.message);
		}
		
		form.trigger('reset');
		instance.onSuccess('Task has been created!');
	}
});

function timeParse(startDate, endDate, estimate) {
	const time = { startDate: null, endDate: null, estimate: null };
	if ( estimate ) {
		return { ...time, estimate: Number(estimate) }
	}
	
	if ( startDate && endDate ) {
		return { ...time, startDate: new Date(startDate), endDate: new Date(endDate) }
	}
}


Template.Create_task_modal.inheritsHelpersFrom(Template.Base_modal);
Template.Create_task_modal.inheritsEventsFrom(Template.Base_modal);
Template.Create_task_modal.inheritsHooksFrom(Template.Base_modal);