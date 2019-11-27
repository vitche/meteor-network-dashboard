import { Meteor } from 'meteor/meteor';
import { CLUSTER_ALIASES, CLUSTER_TITLES } from '../../../../configs/clusters/clusters.config';
import { GROUP_ALIASES, GROUP_TITLES } from '../../../../configs/groups/groups.config';
import { ROLES_DICTIONARY } from '../../../../configs/roles/roles.dictionary';
import { GroupsCollection } from '../../../groups/both/groups.schema';
import { ClusterModel } from '../../../models/clusters/server/clusters.model';
import { RolesService } from '../../../roles/server/services/roles.service';
import { UsersCollection } from '../../../users/both/users.schema';
import { OrganizationCollection} from '../../../models/organizations/server/organization.collection';

export const approveOrganization = async function (organizationId, ownerId, groupTitle) {
	// TODO: make it as transaction flow
	try {
		// get root group as a parent for organizations groups
		const rootGroup = await GroupsCollection.findOne({ alias: GROUP_ALIASES.rootGroupAlias });

		// get organization data
		const organization = await OrganizationCollection.findOne({ _id: organizationId });

		// create root group of organization with provided title
		const organizationGroupId = await GroupsCollection.insert({
			title: groupTitle,
			alias: GROUP_ALIASES.organizationRootGroupAlias,
			organizationId: organizationId,
			parentGroupId: rootGroup._id,
			permissions: [ ROLES_DICTIONARY.private.organizationOwner.alias ]
		});

		// create a default group with all members of organization
		const membersGroupId = await GroupsCollection.insert({
			title: `${ organization.title } ${ GROUP_TITLES.organizationMembersGroupTitle }`,
			alias: GROUP_ALIASES.organizationMembersGroupAlias,
			organizationId: organizationId,
			parentGroupId: organizationGroupId,
			permissions: [ ROLES_DICTIONARY.private.organizationMember.alias ]
		});

		// create a default cluster
		const organizationClusterId = await ClusterModel.insert({
			title: `${ organization.title } ${ CLUSTER_TITLES.allSensorClusterTitle }`,
			alias: CLUSTER_ALIASES.allSensorClusterAlias,
			organizationId: organizationId,
			groups: [ organizationGroupId ]
		});

		// link default group with default cluster
		const updatedGroup = await GroupsCollection.update(organizationGroupId, {
			$addToSet: {
				clusters: organizationGroupId
			}
		});

		// set root group id and default cluster id to organization document
		const updatedOrganization = await OrganizationCollection.update(organizationId, {
			$set: {
				groupId: organizationGroupId,
				clusterId: organizationClusterId,
				verified: true,
			}
		});

		// update user with his organization
		const updatedUser = await UsersCollection.update(ownerId, {
			$set: {
				'profile.organizationId': organizationId,
			}
		});

		// update user permissions
		await RolesService.setUserPermissions(
			ownerId,
			[ ROLES_DICTIONARY.private.organizationOwner.alias ],
			organizationGroupId
		);
		await RolesService.setUserPermissions(
			ownerId,
			[ ROLES_DICTIONARY.private.organizationMember.alias ],
			membersGroupId
		);

	} catch (err) {
		console.error('approveOrganization: ', err);
		throw new Meteor.Error('approve-organization-error', err.message)
	}
	return true;
};