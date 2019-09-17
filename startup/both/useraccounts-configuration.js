import { AccountsTemplates } from 'meteor/useraccounts:core';
import { postSignUpHook, onLogoutHook } from './useraccounts.hooks'

FlowRouter.triggers.enter([ AccountsTemplates.ensureSignedIn ]);

AccountsTemplates.configure({
	defaultTemplate: 'authenticationPage',
	defaultLayout: 'authenticationLayout',
	showForgotPasswordLink: true,
	defaultLayoutRegions: {},
	showPlaceholders: true,
	defaultContentRegion: 'main',
	onLogoutHook: onLogoutHook,
	postSignUpHook: postSignUpHook
});

// Remove email and password fields to placed them in correct order
const email = AccountsTemplates.removeField('email');
const password = AccountsTemplates.removeField('password');

AccountsTemplates.addFields([
	{
		_id: 'firstName',
		type: 'text',
		placeholder: 'First Name',
		trim: true,
		required: true,
	},
	{
		_id: 'lastName',
		type: 'text',
		placeholder: 'Last Name',
		trim: true,
		required: true
	}
]);

// Ask email and password after First and Last name were entered
AccountsTemplates.addField(email);
AccountsTemplates.addField(password);

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

AccountsTemplates.configureRoute('enrollAccount', {
	name: 'enrollAccount',
	path: '/enroll-account',
});
