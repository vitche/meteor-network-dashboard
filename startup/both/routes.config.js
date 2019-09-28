import { PROTECTED_ELEMENTS } from '../../configs/roles/protected-elements';
import { ROLES_DICTIONARY } from '../../configs/roles/roles.dictionary';

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
	profile: {
		prefix: '/profile',
		profile: {
			name: 'profile.profile',
			path: '/',
			permissions: [ ROLES_DICTIONARY.private.defaultUser.alias ]
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
		},
		addChild: {
			name: 'groups.addChild',
			path: '/add-child/:id',
			permissions: [
				ROLES_DICTIONARY.private.superAdmin.alias,
				ROLES_DICTIONARY.private.organizationOwner.alias,
				ROLES_DICTIONARY.public.allowAddChildGroup.alias
			]
		}
	}
};