export const GroupService = {

	getGroupUsers(groupId, callback) {
		Meteor.call('groups.method.getGroupUsers', { groupId }, (err, result) => {
			if (err) {
				throw new Meteor.Error(err);
			}

			const users = result.map((user) => {
				return {
					_id: user._id,
					email: user.emails[0].address,
					firstName: user.profile.firstName,
					lastName: user.profile.lastName
				}
			});


			callback(users);
		})
	}
};


