export const OrganizationService = {
	sendCreatingOrganizationRequest({ title }) {
		const userId = Meteor.userId();
		new Promise(((resolve, reject) => {
			Meteor.call('organization.createOrganizationRequest', { title, userId }, (err, res) => {
				if (err) {
					reject(err)
				}

				resolve(res);
			})
		}))
	}
};