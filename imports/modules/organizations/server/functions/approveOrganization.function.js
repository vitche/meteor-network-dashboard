import { ROLES_DICTIONARY } from '../../../../configs/roles/roles.dictionary';
import { GroupsCollection } from '../../../groups/both/groups.schema';
import { UsersMethods } from '../../../users/both/users.methods';
import { UsersCollection } from '../../../users/both/users.schema';
import { OrganizationsCollection } from '../../both/organizations.schema';

export const approveOrganization = async function (organizationId, ownerId, groupTitle) {
	// TODO: make it as transaction flow
	try {
		const rootGroup = await GroupsCollection.findOne({ alias: DEFAULT_GROUPS.rootGroup.alias });

		const groupId = await GroupsCollection.insert({
			title: groupTitle,
			organizationId: organizationId,
			parentGroupId: rootGroup._id,
			permissions: [ ROLES_DICTIONARY.private.organizationOwner.alias ]
		});

		const updatedOrganization = await OrganizationsCollection.update(organizationId, {
			$set: {
				groupId: groupId,
				verified: true,
			}
		});

		const updatedUser = await UsersCollection.update(ownerId, {
			$set: {
				'profile.organizationId': organizationId,
			}
		});

		UsersMethods.addPermissionToUser.call({
			userId: ownerId,
			permissions: [ ROLES_DICTIONARY.private.organizationOwner.alias ],
			groupId
		});
	} catch (err) {
		console.log(err);
		throw new Meteor.Error('operation-fail', err.message)
	}
	return true;
};