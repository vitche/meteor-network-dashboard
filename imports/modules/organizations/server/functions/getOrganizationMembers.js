import { UsersCollection } from '../../../users/both/users.schema';

export const getOrganizationMembers = async () => {
	const user = Meteor.user();
	
	if ( !user ) {
		throw new Meteor.Error(403)
	}
	
	if ( !user.profile.organizationId ) {
		throw new Meteor.Error(400, 'User should be a member of organization');
	}
	
	const users = await UsersCollection.find(
		{
			'profile.organizationId': user.profile.organizationId
		},
		{
			fields: {
				'profile.firstName': 1,
				'profile.lastName': 1,
				'emails.address': 1,
			}
		}).fetch();
	console.log(users);
	return users;
};