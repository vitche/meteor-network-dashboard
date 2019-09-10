import { Template } from 'meteor/templating';
import { AccountsTemplates } from 'meteor/useraccounts:core';

import '../dashboard/client/dashboard';
import '../ui-peer-list/client/peers-list';
import '../ui-peer-edit/client/peer';

import './layout.html'
import { Meteor } from "meteor/meteor";


Template.layout.helpers({
    peerIdentifier: function() {
        return FlowRouter.getParam('_id');
    },
    emailLocal: function() {
        const user = Meteor.user();
		// As we work with synchronous MeteorJS it can be delay between receiving data from MiniMongo
        if (!user) {
            return;
        }

        return user.emails && user.emails[0];
    }
});

Template.layout.events({
    'click #logout-button'() {
        AccountsTemplates.logout();
    }
});