import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { GroupsCollection } from '../both/groups.schema';
import { RolesHelpers } from '../../roles/server/helpers/roles.helpers';
import { Mixins } from '../../../helpers/server/mixins'
import { ROLES_DICTIONARY } from '../../../configs/roles/roles.dictionary';

export const getGroupsList = new ValidatedMethod({
	name: 'groups.method.getGroupsList',
	mixins: [ Mixins.loggedIn, Mixins.roles ],
	roles: [ ROLES_DICTIONARY.superAdmin.alias, ROLES_DICTIONARY.organizationOwner.alias, ROLES_DICTIONARY.allowReviewGroup ],
	validate: null,
	run() {
		if (RolesHelpers.isSuperAdmin()) {
			return GroupsCollection.find({}).fetch();
		}



		return [];
	},
});