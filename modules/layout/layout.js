import { Template } from 'meteor/templating';
import { AccountsTemplates } from 'meteor/useraccounts:core';

import '../dashboard/client/dashboard';
import '../ui-peer-list/client/peers-list';
import '../ui-peer-edit/client/peer';

import './layout.html'

Template.layout.helpers({
    peerIdentifier: function() {
        return FlowRouter.getParam('_id');
    }
});

Template.layout.events({
    'click #logout-button'() {
        AccountsTemplates.logout();
    }
});