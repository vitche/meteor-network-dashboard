import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { TasksService} from '../../services/tasks.service';
import * as faker from 'faker';

import './tasks-list.page.html';
import { TasksCollection } from '../../../../models/tasks/client/tasks.collection';
import { TASKS_PUBLICATIONS } from '../../../both/tasks.publications-dict';

Template.Tasks_page.onCreated(function () {
	this.state = new ReactiveDict();
	
	const taskHandler = this.subscribe(TASKS_PUBLICATIONS.getTasks);
	
	this.autorun(() => {
		if ( taskHandler.ready() ) {
			const tasksList = TasksCollection.find();
			this.state.set('tasks', tasksList);
		}
	})
});

Template.Tasks_page.helpers({
	tasksList: function () {
		return Template.instance().state.get('tasks');
	}
});

Template.Tasks_page.events({
	'click .js-create-task': async function (event, template) {
	}
	
});