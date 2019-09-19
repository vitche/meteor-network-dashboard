import { PROTECTED_ELEMENTS } from '../../configs/roles/protected-elements';

export const WHITE_LIST_ROUTES = [
	'changePwd',
	'enrollAccount',
	'forgotPwd',
	'hide',
	'resendVerificationEmail',
	'resetPwd',
	'signIn',
	'signUp',
	'verifyEmail',
	'join'
];

export const ROUTES_CONFIG = {
	dashboard: {
		prefix: '/',
		list: {
			name: 'dashboard.list',
			path: '/',
			permissions: PROTECTED_ELEMENTS.viewDashboardPage
		}
	},
	peers: {
		prefix: '/peers',
		list: {
			name: 'peers.list',
			path: '/',
			permissions: PROTECTED_ELEMENTS.viewPeersPage
		},
		edit: {
			name: 'peers.edit',
			path: '/:id',
			permissions: PROTECTED_ELEMENTS.viewPeersPage
		}
	},
	groups: {
		prefix: '/groups',
		list: {
			name: 'groups.list',
			path: '/',
			permissions: PROTECTED_ELEMENTS.viewGroupsPage
		}
	}
};