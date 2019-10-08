export const OrganizationService = {
	sendCreatingOrganizationRequest({ title }) {
		return new Promise((resolve, reject) => {
			Meteor.call('organization.createOrganizationRequest', { title }, (err, res) => {
				if (err) {
					reject(err)
				}

				resolve(res);
			})
		})
	}
};