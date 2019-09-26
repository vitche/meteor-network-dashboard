import { Template } from 'meteor/templating';
import { Peer } from '../../../peer/model';

import './peers-list.html'

Template.peerListWidget.helpers({
	items() {
		return Peer.find({});
	}
});
