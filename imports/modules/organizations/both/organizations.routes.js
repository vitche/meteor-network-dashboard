import { ROLES_DICTIONARY } from '../../../configs/roles/roles.dictionary';

export const ORGANIZATION_ROUTES = {
	prefix: '/organizations',
	list: {
		name: 'organizations.list',
		path: '/',
		permissions: [ ROLES_DICTIONARY.private.superAdmin.alias ]
	},
	info: {
		name: 'organizations.info',
		path: '/:id',
		permissions: [  ]
	}
};