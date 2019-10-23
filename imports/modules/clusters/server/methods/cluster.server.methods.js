import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { ROLES_DICTIONARY } from '../../../../configs/roles/roles.dictionary';
import { Mixins } from '../../../../helpers/server/mixins';
import { CLUSTER_METHODS_DICT } from '../../both/methods-dict';

import { createCluster } from '../functions/createCluster.function';

export const createClusterMethod = new ValidatedMethod({
	name: CLUSTER_METHODS_DICT.createCluster,
	mixins: [ Mixins.loggedIn, Mixins.roles ],
	roles: [
		ROLES_DICTIONARY.private.superAdmin.alias,
		ROLES_DICTIONARY.private.organizationOwner.alias,
		ROLES_DICTIONARY.public.allowCreateCluster.alias
	],
	validate: new SimpleSchema({
		title: { type: String }
	}).validator(),
	async run({ title }) {
		return await createCluster(title);
	}
});