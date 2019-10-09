import { Meteor } from 'meteor/meteor';
import { Peer } from '../imports/modules/peer/model';

import '../imports/utils/server';

import '../imports/startup/both/';
import '../imports/modules/users/both';
import '../imports/modules/groups/both';

import '../imports/startup/server';
import '../imports/modules/users/server';
import '../imports/modules/groups/server';
import '../imports/modules/organizations/server';

Meteor.startup(() => {
	if (0 === Peer.find({}).count()) {
		Peer.insert({
			name: 'Test network host shell tunnel',
			uri: 'grpc://peer0.org1.example.com:7053'
		});
		console.log('Created test peers');
	}
});
