import { OrganizationModel } from '../../../models/organizations/server/organization.model';
import { UsersCollection } from '../../../users/both/users.schema';
import { GROUP_ALIASES, GROUP_TITLES } from '../../../../configs/groups/groups.config';
import { ROLES_DICTIONARY } from '../../../../configs/roles/roles.dictionary';
import { RolesService } from '../../../roles/server/services/roles.service';
import { GroupModel } from '../../../models/groups/server/group.model';

export const createOrganizationRequest = async function (title) {
	const userId = Meteor.userId();
	let organizationId;
	// TODO: make it as transaction flow
	try {
		organizationId = await OrganizationModel.insert({ title, ownerId: userId });

		// create root group of organization with provided title
		await GroupModel.bulkInsert([
			{
				title: `${ title } ${ GROUP_TITLES.organizationOwnersGroupTitle }`,
				alias: GROUP_ALIASES.organizationRootGroupAlias,
				organizationId: organizationId,
				permissions: [ ROLES_DICTIONARY.private.organizationOwner.alias ]
			},
			{
				title: `${ title } ${ GROUP_TITLES.organizationMembersGroupTitle }`,
				alias: GROUP_ALIASES.organizationMembersGroupAlias,
				organizationId: organizationId,
				permissions: [ ROLES_DICTIONARY.private.organizationMember.alias ]
			} ]);


		await UsersCollection.update(userId, {
			$set: {
				'profile.organizationId': organizationId,
			}
		});

		// update user permissions
		await RolesService.setUserPermissions(
			userId,
			[ ROLES_DICTIONARY.private.organizationOwner.alias ],
			organizationGroupId
		);
		await RolesService.setUserPermissions(
			userId,
			[ ROLES_DICTIONARY.private.organizationMember.alias ],
			membersGroupId
		);

	} catch ( err ) {
		console.log(err);
		throw new Meteor.Error(400, err.message);
	}

	return result;
};