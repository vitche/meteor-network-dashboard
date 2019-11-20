import { ROLES_DICTIONARY } from '../../../configs/roles/roles.dictionary';

export const CLUSTERS_ROUTERS = {
	prefix: '/clusters',
	list: {
		name: 'clusters.list',
		path: '/',
		permissions: [
			ROLES_DICTIONARY.private.superAdmin.alias,
			ROLES_DICTIONARY.private.organizationOwner.alias,
			ROLES_DICTIONARY.public.allowReviewClusters.alias,
		]
	}
};