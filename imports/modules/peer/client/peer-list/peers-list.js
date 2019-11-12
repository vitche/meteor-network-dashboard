import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { PeersCollection } from '../../../models/peers/client/peers.collections';

const faker = require('faker');

import './peers-list.html'
import { PEER_PUBLISH_ENUM, PEER_TYPES_ENUM } from '../../both/peers.enum';


Template.peerListWidget.onCreated(function () {
	this.state = new ReactiveDict();
	
	const peersHandler = this.subscribe(PEER_PUBLISH_ENUM.getPeersList);
	
	this.autorun(() => {
		if ( peersHandler.ready() ) {
			const peersList = PeersCollection.find().fetch();
			console.log(peersList);
			this.state.set('peersList', peersList)
		}
	})
	
});

Template.peerListWidget.helpers({
	peersList: function() {
		return Template.instance().state.get('peersList')
	}
});

Template.peerListWidget.events({
	'click .js-create-peer': function (event, template) {
		const types = Object.values(PEER_TYPES_ENUM).map((value) => value.alias);
		PeersCollection.insert({
			name: faker.random.word(),
			type: types[Math.floor(Math.random() * Math.floor(3))]
		});
	}
});
