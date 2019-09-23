import { SERVER_SESSIONS_KEYS } from '../../../../configs/server-session.keys';
import * as _ from 'lodash';
import { ROLES_DICTIONARY } from '../../../../configs/roles/roles.dictionary';

/**
 * verify is user has permission as superAdmin
 * @returns {boolean}
 */
const isSuperAdmin = () => {
	const currentUserPermissions = ServerSession.get(SERVER_SESSIONS_KEYS.userPermissions);
	return _.includes(currentUserPermissions, ROLES_DICTIONARY.superAdmin.alias);
};


export const RolesHelpers = {
	isSuperAdmin,
};