/**
 * Routers related to all Dashboard functionality
 */

import { Meteor } from 'meteor/meteor';

FlowRouter.triggers.enter([AccountsTemplates.ensureSignedIn]);

FlowRouter.route('/', {
    name: 'dashboard.list',
    action: function (params, queryParams) {
        BlazeLayout.render('layout', { main: 'dashboard' });
    },
});