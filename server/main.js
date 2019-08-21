import { Meteor } from 'meteor/meteor';
import { Peer } from '../modules/peer/model';

Meteor.startup(() => {
    if (0 === Peer.find({}).count()) {
  	    Peer.insert({
  	  	    name: "Test network host shell tunnel",
  	  	    uri: "grpc://peer0.org1.example.com:7053"
  	    });
  	    console.log("Created test peers");
    }
});
