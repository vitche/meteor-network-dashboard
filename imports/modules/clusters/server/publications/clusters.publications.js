import { ROLES_DICTIONARY } from '../../../../configs/roles/roles.dictionary';
import { GroupsCollection } from '../../../groups/both/groups.schema';
import { ClusterModel } from '../../../models/clusters/server/clusters.model';
import { RolesHelpers } from '../../../roles/server/helpers/roles.helpers';
import { RolesService } from '../../../roles/server/services/roles.service';

Meteor.publish('clusters.publish.getClustersList', function () {
	const userId = this.userId;
	if (!userId) {
		throw Meteor.Error('User must be logged in');
	}

	const requiredPermissions = [
		ROLES_DICTIONARY.private.superAdmin.alias,
		ROLES_DICTIONARY.private.organizationOwner.alias,
		ROLES_DICTIONARY.public.allowReviewClusters.alias
	];

	if (!RolesService.isAllowedAction(requiredPermissions)) {
		this.ready();
		throw new Meteor.Error('You have not permissions for review groups');
	}

	if (RolesHelpers.isSuperAdmin()) {
		return ClusterModel.findAll()
	}

	const user = Meteor.user();
	const userGroups = Object.keys(user.roles);

	return GroupsCollection.find({
		_id: { $in: userGroups },
		alias: { $ne: DEFAULT_GROUPS.allUsers.alias }
	})
});