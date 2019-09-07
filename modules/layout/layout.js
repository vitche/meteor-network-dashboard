import { Template } from 'meteor/templating';

import '../dashboard/client/dashboard';
import '../peer-list/client/peers-list';
import '../peer-edit/client/peer';

import './layout.html'

Template.layout.helpers({
    peerIdentifier: function() {
        return FlowRouter.getParam('_id');
    }
});