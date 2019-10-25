import { UsersCollection } from '../../../users/both/users.schema';

export const setupProfile = async (firstName, lastName) => {
	const userId = Meteor.userId();
	if (!userId) {
		throw new Meteor.Error(404, 'User must be logged in');
	}

	let user;
	try {
		user = await UsersCollection.update(userId, {
			$set: {
				'emails.0.validate': true,
				'emails.0.primary': true,
				'profile.firstName': firstName.trim(),
				'profile.lastName': lastName.trim()
			}
		});
	} catch (err) {
		console.error('setupProfile : ', err);
		throw new Meteor.Error(400, err.message);
	}

	return user;
};