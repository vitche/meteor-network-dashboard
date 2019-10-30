import { Meteor } from 'meteor/meteor';
import { Peer } from '../imports/modules/peer/model';
// import {FabricConnectionFactory} from '../imports/modules/fabric-client/server/connection-factory';

import '../imports/utils/server';

import '../imports/startup/both/';
import '../imports/modules/users/both';
import '../imports/modules/groups/both';
import '../imports/modules/tasks/both';

import '../imports/startup/server';
import '../imports/modules/users/server';
import '../imports/modules/groups/server';
import '../imports/modules/organizations/server';
import '../imports/modules/profile/server';
import '../imports/modules/clusters/server';
import '../imports/modules/tasks/server';

/*
let connectionFactory = new FabricConnectionFactory('../.certificates');
connectionFactory.connect('http://localhost:7054', 'ca.example.com').then((connection) => {
    console.log('Connected to HyperLedger Fabric');

    let userContext = connection.userContext('admin');
    userContext.load().then((rootUser) => {
        if (rootUser && rootUser.isEnrolled()) {---+++
            console.log('Root user loaded:', rootUser);
            let childUserLogOn = 'user-5';
            userContext = connection.userContext(childUserLogOn);
            userContext.load().then((childUser) => {
                if (childUser && childUser.isEnrolled()) {
                    console.log('Child user loaded:', childUser);
                } else {
                    console.log('Will register a child user');
                    userContext.registerChild(
                        'Org1MSP',
                        rootUser,
                        'org1.department1',
                        childUserLogOn).then((childUser) => {
                        console.log('Registered child user:', childUser);
                    });
                }
            });
        } else {
            userContext.register('Org1MSP', 'adminpw').then((newUser) => {
                console.log('Registered a new user:', newUser);
            });
        }
    });
});
*/

Meteor.startup(() => {
	if (0 === Peer.find({}).count()) {
		Peer.insert({
			name: 'Test network host shell tunnel',
			uri: 'grpc://peer0.org1.example.com:7053'
		});
		console.log('Created test peers');
	}
});