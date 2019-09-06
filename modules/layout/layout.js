import { Template } from 'meteor/templating';

import '../pages/dashboard/client/dashboard';
import '../pages/peer-list/client/peers-list';
import '../pages/peer-edit/client/peer';

import './layout.html'

Template.layout.helpers({
    peerIdentifier: function() {
        return FlowRouter.getParam('_id');
    }
});