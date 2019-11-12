import { SERVER_SESSIONS_KEYS } from '../../../../configs/server-session.keys';
import * as _ from 'lodash';
import { ROLES_DICTIONARY } from '../../../../configs/roles/roles.dictionary';

/**
 * verify is user has permission as superAdmin
 * @returns {boolean}
 */
const isSuperAdmin = () => {
	const currentUserPermissions = ServerSession.get(SERVER_SESSIONS_KEYS.userPermissions);
	return _.includes(currentUserPermissions, ROLES_DICTIONARY.private.superAdmin.alias);
};

const isOrganizationOwner = () => {
	const currentUserPermissions = ServerSession.get(SERVER_SESSIONS_KEYS.userPermissions);
	return _.includes(currentUserPermissions, ROLES_DICTIONARY.private.organizationOwner.alias)
};

const isOrganizationMember = () => {
	const currentUserPermissions = ServerSession.get(SERVER_SESSIONS_KEYS.userPermissions);
	return _.includes(currentUserPermissions, ROLES_DICTIONARY.private.organizationMember.alias)
};

const isHasPermission = (neededPermissions) => {
	const currentUserPermissions = ServerSession.get(SERVER_SESSIONS_KEYS.userPermissions);
	return neededPermissions.every(permission => currentUserPermissions.includes(permission));
};


export const RolesHelpers = {
	isSuperAdmin,
	isOrganizationOwner,
	isOrganizationMember,
	isHasPermission
};