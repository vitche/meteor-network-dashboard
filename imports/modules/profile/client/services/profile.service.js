class ProfileServiceClass {
	constructor() {
	}

	inviteUserToOrganization(email) {
		return new Promise((resolve, reject) => {
			Meteor.call('organization.methods.inviteUser', { email }, (err, response) => {
				if (err) {
					reject(err)
				}

				resolve(response)
			})
		})
	}
}

export const ProfileService = new ProfileServiceClass();