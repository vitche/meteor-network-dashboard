import { AccountsTemplates } from 'meteor/useraccounts:core';
import { postSignUpHook, onLogoutHook } from './useraccounts.hooks'
import * as _ from 'lodash';
import { ROUTES_CONFIG, WHITE_LIST_ROUTES } from './routes.config';
import { SERVER_SESSIONS_KEYS } from '../../configs/server-session.keys';


function isRedirectAllow(path) {
	const routeName = path.route.name;

	if (!routeName) {
		FlowRouter.go(ROUTES_CONFIG.dashboard.list.name);
		throw Error('No entered route configured!');
	}

	if (_.indexOf(WHITE_LIST_ROUTES, routeName) > -1) {
		return;
	}

	const route = _.get(ROUTES_CONFIG, routeName);

	if (!route) {
		// if route wasn't configured in out configs
		// then just redirect to main page
		FlowRouter.go(ROUTES_CONFIG.dashboard.list.name)
		// TODO show notification to user
	}

	// if route doesn't required any permission pass it
	if (!route.permissions.length) {
		return true;
	}

	const userPermissions = ServerSession.get(SERVER_SESSIONS_KEYS.userPermissions);

	if (!userPermissions) {
		FlowRouter.go(ROUTES_CONFIG.dashboard.list.name)
	}

	const isAllow = _.intersection(userPermissions, route.permissions);

	if (!isAllow.length) {
		FlowRouter.go(ROUTES_CONFIG.dashboard.list.name);
	}

	return true;
}

FlowRouter.triggers.enter([ AccountsTemplates.ensureSignedIn, isRedirectAllow ]);

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
	name: 'signIn',
	path: '/signin',
	redirect: '/'
});

AccountsTemplates.configureRoute('signUp', {
	name: 'join',
	path: '/join',
	redirect: '/'
});

AccountsTemplates.configureRoute('forgotPwd');

AccountsTemplates.configureRoute('resetPwd', {
	name: 'resetPwd',
	path: '/reset-password',
	redirect: '/'
});

AccountsTemplates.configureRoute('enrollAccount', {
	name: 'enrollAccount',
	path: '/enroll-account',
	redirect: '/setup-profile'
});
