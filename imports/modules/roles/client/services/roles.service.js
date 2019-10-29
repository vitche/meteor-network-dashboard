import * as _ from 'lodash';
import { ROLES_DICTIONARY } from '../../../../configs/roles/roles.dictionary';
import { SERVER_SESSIONS_KEYS } from '../../../../configs/server-session.keys';

class RolesServiceClass {
	constructor() {
		this.permissions = [];
	}

	getPermissions() {
		return ServerSession.get(SERVER_SESSIONS_KEYS.userPermissions);
	}

	isAllowedAction(userPermissions) {
		return !!_.intersection(this.getPermissions(), userPermissions).length
	}

	isAllowToInviteUsers() {
		return this.getPermissions().indexOf(ROLES_DICTIONARY.private.organizationOwner.alias) > -1;
	}

}

export const RolesService = new RolesServiceClass();