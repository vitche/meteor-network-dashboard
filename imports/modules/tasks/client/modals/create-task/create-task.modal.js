import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { TasksService } from '../../services/tasks.service';

import './create-task.modal.html'

Template.Create_task_modal.onCreated(function () {
	this.state = new ReactiveDict()
});

Template.Create_task_modal.helpers({
	hasError: function () {
		return Template.instance().state.get('hasError');
	}
});

Template.Create_task_modal.events({
	'click .js-save': async function (event, template) {
		event.preventDefault();
		
		const instance = Template.instance();
		const form = $('#crete-task-form');
		
		// TODO made it more beautiful
		// console.log(form.serializeArray());
		
		const title = $('input[name=task-title]').val();
		const description = $('textarea[name=task-description]').val();
		const startDate = $('input[name=task-start-date]').val();
		const endDate = $('input[name=task-end-date]').val();
		const executorType = $('select[name=task-executor]').val();
		const priceRate = $('input[name=task-rate]').val();
		const prolongation = $('input[type=\'checkbox\']').is(':checked');
		
		instance.startLoading();
		try {
			const taskId = await TasksService.createTask({
				title,
				description,
				time: { startDate: new Date(startDate), endDate: new Date(endDate) },
				executorType,
				priceRate: Number(priceRate),
				prolongation
			});
			form.trigger('reset');
			instance.onSuccess('Task has been created!');
		} catch ( err ) {
			instance.onError(err.message);
		}
	}
});


Template.Create_task_modal.inheritsHelpersFrom(Template.Base_modal);
Template.Create_task_modal.inheritsEventsFrom(Template.Base_modal);
Template.Create_task_modal.inheritsHooksFrom(Template.Base_modal);