import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import '../modules/peer/client/main'
import '../modules/peer-edit/client/widget'
import '../modules/peer-list/client/widget'

Template.main.helpers({
	peerIdentifier: function() {
		return FlowRouter.getParam('_id');
	}
});