import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { DevicesCollection } from '../../../models/devices/client/devices.collections';

const faker = require('faker');

import './devices-list.html'
import { DEVICES_PUBLISH_ENUM, DEVICES_TYPES_ENUM } from '../../both/devices.enum';


Template.devicesListWidget.onCreated(function () {
	this.state = new ReactiveDict();
	
	const devicesHandler = this.subscribe(DEVICES_PUBLISH_ENUM.getDevicesList);
	
	this.autorun(() => {
		if ( devicesHandler.ready() ) {
			const devicesList = DevicesCollection.find().fetch();
			this.state.set('devicesList', devicesList)
		}
	})
	
});

Template.devicesListWidget.helpers({
	devicesList: function() {
		return Template.instance().state.get('devicesList')
	}
});

Template.devicesListWidget.events({
	'click .js-create-devices': function (event, template) {
		const types = Object.values(DEVICES_TYPES_ENUM).map((value) => value.alias);
		DevicesCollection.insert({
			name: faker.random.word(),
			type: types[Math.floor(Math.random() * Math.floor(3))]
		});
	}
});
