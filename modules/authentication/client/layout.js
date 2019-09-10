import { Template } from 'meteor/templating';

import './layout.html'

Template.authenticationLayout.onRendered(function() {
    $('body').removeClass('sidebar-mini');
    $('body').addClass('login-page');
});

Template.authenticationLayout.onDestroyed(function() {
    $('body').removeClass('login-page');
    $('body').addClass('sidebar-mini');
});