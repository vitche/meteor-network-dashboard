import { PAGE_PERMISSIONS } from '../../configs/roles/protected-elements';
import { ROLES_DICTIONARY } from '../../configs/roles/roles.dictionary';
import { CLUSTERS_ROUTERS } from '../../modules/clusters/both/clusters.routers.config';
import { ORGANIZATION_ROUTES } from '../../modules/organizations/both/organizations.routes';
import { TASKS_ROUTES } from '../../modules/tasks/both/tasks.routes';

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
	setupProfile: {
		name: 'setupProfile',
		path: '/setup-profile',
		permissions: [ ROLES_DICTIONARY.private.defaultUser.alias ]
	},
	dashboard: {
		prefix: '/',
		list: {
			name: 'dashboard.list',
			path: '/',
			permissions: PAGE_PERMISSIONS.viewDashboardPage
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
	organizations: { ...ORGANIZATION_ROUTES },
	clusters: { ...CLUSTERS_ROUTERS },
	tasks: { ...TASKS_ROUTES },
	peers: {
		prefix: '/peers',
		list: {
			name: 'peers.list',
			path: '/',
			permissions: PAGE_PERMISSIONS.viewPeersPage
		},
		edit: {
			name: 'peers.edit',
			path: '/:id',
			permissions: PAGE_PERMISSIONS.viewPeersPage
		}
	},
	groups: {
		prefix: '/groups',
		list: {
			name: 'groups.list',
			path: '/',
			permissions: PAGE_PERMISSIONS.viewGroupsPage
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