import { AccountsTemplates } from 'meteor/useraccounts:core';



FlowRouter.triggers.enter([AccountsTemplates.ensureSignedIn]);

AccountsTemplates.configure({
    defaultTemplate: 'authenticationPage',
    defaultLayout: 'authenticationLayout',
    showForgotPasswordLink: true,
    defaultLayoutRegions: {},
    defaultContentRegion: 'main',
    onLogoutHook: function () {
        FlowRouter.go('/signin');
    }
});

AccountsTemplates.configureRoute('signIn', {
    name: 'signin',
    path: '/signin'
});

AccountsTemplates.configureRoute('signUp', {
    name: 'join',
    path: '/join',
});

AccountsTemplates.configureRoute('forgotPwd');

AccountsTemplates.configureRoute('resetPwd', {
    name: 'resetPwd',
    path: '/reset-password',
});
