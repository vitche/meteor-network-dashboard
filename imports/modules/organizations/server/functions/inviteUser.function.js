
import { GROUP_ALIASES } from '../../../../configs/groups/groups.config';
import { EmailService } from '../../../../utils/server/email/email.service';
import { RolesService } from '../../../roles/server/services/roles.service';
import { UsersCollection } from '../../../users/both/users.schema';
import { GroupModel } from '../../../models/groups/server/group.model';

// We should not create an user and give him a permissions before he accept the invitation
// We must just send an invitation letter and only after user accept it create an user document
// but Meteor.Account.sendEnrollmentEmail work only with already created user
// TODO: refactor this function with just sending an email with some token and do not create any users.
export const inviteUser = async function (userId) {
	try {
		const loggedUser = Meteor.user();

		// set to user organization id by default

		await UsersCollection.update(userId, {
			$set: {
				'profile.organizationId': loggedUser.profile.organizationId,
			}
		});

		// get id of group that contain all organization members
		const group = await GroupModel.findOne(
			{
				$and: [
					{ organizationId: loggedUser.profile.organizationId },
					{ alias: GROUP_ALIASES.organizationMembersGroupAlias }
				]
			});

		// update user with permissions of group
		await RolesService.setUserPermissions(userId, group.permissions, group._id);

		EmailService.sendEnrollmentEmail(userId);
	} catch (err) {
		console.error('createDefaultUser: ', err);
		throw new Meteor.Error('invite-user-error', err.message);
	}

	return true;
};