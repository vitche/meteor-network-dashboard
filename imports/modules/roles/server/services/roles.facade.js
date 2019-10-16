class RolesFacadeClass {
	constructor() {
	}

	addUsersToRoles(users, roles, group) {
		Roles.addUsersToRoles(users, roles, group);
	}
}

export const RolesFacade = new RolesFacadeClass();