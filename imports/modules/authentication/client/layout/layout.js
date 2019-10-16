import { Template } from 'meteor/templating';

import './layout.html'

import '../templates/at-pwd-form-btn/at-pwd-form-btn.html';
import '../templates/at-text-input/at-text-input.html';
import '../templates/at-error/at-error.html';
import '../templates/at-title/at-title.html';

Template.authenticationLayout.onRendered(function() {
    $('body').removeClass('sidebar-mini');
    $('body').addClass('login-page');
});

Template.authenticationLayout.onDestroyed(function() {
    $('body').removeClass('login-page');
    $('body').addClass('sidebar-mini');
});

Template['override-atPwdFormBtn'].replaces('atPwdFormBtn');
Template['override-atTitle'].replaces('atTitle');
Template['override-atTextInput'].replaces('atTextInput');
Template['override-atError'].replaces('atError');