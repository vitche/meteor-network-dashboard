import { Meteor } from 'meteor/meteor';
import { Peer } from '../modules/peer/model';

import '../startup/both/';
import '../startup/server';

import '../modules/groups/both';
import '../modules/groups/server';

Meteor.startup(() => {
	if (0 === Peer.find({}).count()) {
		Peer.insert({
			name: 'Test network host shell tunnel',
			uri: 'grpc://peer0.org1.example.com:7053'
		});
		console.log('Created test peers');
	}
});
