import { Template } from 'meteor/templating';
import { Peer } from '../../peer/model';

import './widget.html'

Template.peerListWidget.helpers({
	items() {
		return Peer.find({});
	}
});

console.log('node: peer-list.client.widget');
