import { Template } from 'meteor/templating';
import { Peer } from '../../peer/model';

import './widget.html'

Template.peerEditWidget.events({
	'submit .edit'(event) {

		event.preventDefault();

		let name = event.target.name.value;
		let uri = event.target.uri.value;
		Peer.insert({
			name: name,
			uri: uri
		});
	}
});

console.log('node: peer-edit.client.widget');
