import { Meteor } from 'meteor/meteor';
import { PeersModel } from '../../models/peers/server/peers.model';

import { PEER_PUBLISH_ENUM } from '../both/peers.enum';

Meteor.publish(PEER_PUBLISH_ENUM.getPeersList, function () {
	return PeersModel.find();
});