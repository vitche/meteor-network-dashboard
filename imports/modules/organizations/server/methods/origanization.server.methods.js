import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { ROLES_DICTIONARY } from '../../../../configs/roles/roles.dictionary';
import { Mixins } from '../../../../helpers/server/mixins';
import { ORGANIZATION_SERVER_METHODS } from '../../both/organizations.methods';

import { createOrganizationRequest } from '../functions/createOrganizationRequest.function';
import { getOrganizationById } from '../functions/getOrganizationById.function';
import { approveOrganization } from '../functions/approveOrganization.function';
import { inviteUser } from '../functions/inviteUser.function';

export const getOrganizationByIdMethod = new ValidatedMethod({
	name: ORGANIZATION_SERVER_METHODS.getOrganizationById,
	mixins: [ Mixins.loggedIn, Mixins.roles ],
	roles: [
		ROLES_DICTIONARY.private.superAdmin.alias,
		ROLES_DICTIONARY.private.organizationOwner.alias,
		ROLES_DICTIONARY.private.organizationMember.alias
	],
	validate: new SimpleSchema({
		organizationId: { type: String }
	}).validator(),
	async run({ organizationId }) {
		return await getOrganizationById(organizationId)
	}
});

export const createOrganizationRequestMethod = new ValidatedMethod({
	name: ORGANIZATION_SERVER_METHODS.createOrganizationRequest,
	mixin: [ Mixins.loggedIn, Mixins.roles ],
	roles: [
		ROLES_DICTIONARY.private.defaultUser.alias
	],
	validate: new SimpleSchema({
		title: { type: String }
	}).validator(),
	async run({ title }) {
		return await createOrganizationRequest(title)

	}
});

export const approveOrganizationMethod = new ValidatedMethod({
	name: ORGANIZATION_SERVER_METHODS.approveOrganization,
	mixin: [ Mixins.loggedIn, Mixins.roles ],
	roles: [
		ROLES_DICTIONARY.private.superAdmin.alias,
	],
	validate: new SimpleSchema({
		organizationId: { type: String },
		ownerId: { type: String },
		groupTitle: { type: String }
	}).validator(),
	async run({ organizationId, ownerId, groupTitle }) {
		return await approveOrganization(organizationId, ownerId, groupTitle);
	}
});

export const inviteUserMethod = new ValidatedMethod({
	name: ORGANIZATION_SERVER_METHODS.inviteUser,
	mixin: [ Mixins.loggedIn, Mixins.roles ],
	roles: [
		ROLES_DICTIONARY.private.superAdmin.alias,
		ROLES_DICTIONARY.private.organizationOwner.alias
	],
	validate: new SimpleSchema({
		email: { type: String }
	}).validator(),
	async run({ email }) {
		return await inviteUser(email)
	}
});