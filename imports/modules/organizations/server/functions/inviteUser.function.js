import { ROLES_DICTIONARY } from '../../../../configs/roles/roles.dictionary';
import { EmailService } from '../../../../utils/server/email/email.service';
import { UsersCollection } from '../../../users/both/users.schema';
import { OrganizationsCollection } from '../../both/organizations.schema';

export const inviteUser = async function (email) {
	try {
		const loggedUser = Meteor.user();

		// create an user with this type of email
		const userId = Accounts.createUser({ email: email });

		// set to user organization id by default
		const user = await UsersCollection.update(userId, {
			$set: {
				'profile.organizationId': loggedUser.profile.organizationId,
			}
		});

		const { groupId } = await OrganizationsCollection.findOne({ _id: loggedUser.profile.organizationId, }, { groupId: 1 });

		// set to user roles depend on selected group.
		// TODO: call this mesthod only with groupId
		Roles.addUsersToRoles(userId, [ ROLES_DICTIONARY.private.organizationMember.alias ], groupId);

		EmailService.sendEnrollmentEmail(userId);
	} catch (err) {
		console.log(err);
		throw new Meteor.Error('operation-fall', err.message);
	}

	return true;
};