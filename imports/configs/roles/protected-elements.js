import { ROLES_DICTIONARY } from './roles.dictionary';

export const PAGE_PERMISSIONS = {
	viewDashboardPage: [ ROLES_DICTIONARY.private.superAdmin.alias, ROLES_DICTIONARY.private.defaultUser.alias ],
	viewPeersPage: [ ROLES_DICTIONARY.private.superAdmin.alias ],
	viewGroupsPage: [
		ROLES_DICTIONARY.private.superAdmin.alias,
		ROLES_DICTIONARY.private.organizationOwner.alias,
		ROLES_DICTIONARY.private.organizationMember.alias
	],
	viewOrganizationPage: [ ROLES_DICTIONARY.private.superAdmin.alias ],
	viewClustersPage: [
		ROLES_DICTIONARY.private.superAdmin.alias,
		ROLES_DICTIONARY.private.organizationOwner.alias,
		ROLES_DICTIONARY.public.allowReviewClusters.alias
	],
};