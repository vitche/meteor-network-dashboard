import { ORGANIZATION_SERVER_METHODS } from '../../../organizations/both/organizations.methods';
import { PROFILE_METHODS_NAME } from '../../both/methods/profile.methods-name';

class ProfileServiceClass {
	constructor() {
	}

	inviteUserToOrganization(email) {
		return Meteor.callPromise(ORGANIZATION_SERVER_METHODS.inviteUser, { email })
	}

	setupProfile(profileData) {
		return Meteor.callPromise(PROFILE_METHODS_NAME.setupProfile, profileData);
	}


}

export const ProfileService = new ProfileServiceClass();