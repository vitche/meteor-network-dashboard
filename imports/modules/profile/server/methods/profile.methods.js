import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { ROLES_DICTIONARY } from '../../../../configs/roles/roles.dictionary';
import { Mixins } from '../../../../helpers/server/mixins';
import { PROFILE_METHODS_NAME } from '../../both/methods/profile.methods-name';
import { setupProfile } from '../functions/setupProfile';

export const setupProfileMethod = new ValidatedMethod({
	name: PROFILE_METHODS_NAME.setupProfile,
	mixins: [ Mixins.loggedIn, Mixins.roles ],
	roles: [ ROLES_DICTIONARY.private.defaultUser.alias ],
	validate: new SimpleSchema({
		firstName: { type: String },
		lastName: { type: String }
	}).validator(),
	run({ firstName, lastName }) {
		return setupProfile(firstName, lastName)
	}
});