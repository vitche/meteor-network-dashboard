import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { GroupsCollection } from '../both/groups.schema';
import { RolesHelpers } from '../../roles/server/helpers/roles.helpers';
import { Mixins } from '../../../helpers/server/mixins'
import { ROLES_DICTIONARY } from '../../../configs/roles/roles.dictionary';
import { UsersCollection } from '../../users/users.schema';

const DEFAULT_GROUPS = require('../../../configs/default-data/groups.config');

export const getGroupsList = new ValidatedMethod({
	name: 'groups.method.getGroupsList',
	mixins: [ Mixins.loggedIn, Mixins.roles ],
	roles: [ ROLES_DICTIONARY.superAdmin.alias, ROLES_DICTIONARY.organizationOwner.alias, ROLES_DICTIONARY.allowReviewGroup ],
	validate: null,
	run() {

		if (RolesHelpers.isSuperAdmin()) {
			return GroupsCollection.find({}).fetch();
		}

		const user = Meteor.user();
		const userGroups = Object.keys(user.roles);

		return GroupsCollection.find({
			_id: { $in: userGroups },
			alias: { $ne: DEFAULT_GROUPS.allUsers.alias }
		}).fetch();
	},
});

export const getGroupUsers = new ValidatedMethod({
	name: 'groups.method.getGroupUsers',
	mixins: [ Mixins.loggedIn, Mixins.roles ],
	roles: [
		ROLES_DICTIONARY.superAdmin.alias,
		ROLES_DICTIONARY.organizationOwner.alias,
		ROLES_DICTIONARY.allowReviewGroup.alias,
		ROLES_DICTIONARY.allowReviewGroupMembers.alias
	],
	validate: new SimpleSchema({
		groupId: { type: String },
	}).validator(),
	async run({ groupId }) {
		const result = await UsersCollection.rawCollection().aggregate([
			{
				$project: {
					roles: { $objectToArray: '$roles' },
					doc: '$$ROOT'
				}
			},
			// TODO: this is bad perfomance solutions
			{ $unwind: '$roles' },
			{ $match: { 'roles.k': groupId } },
			{ $replaceRoot: { newRoot: '$doc' } },
			{
				$project: {
					'profile.firstName': 1,
					'profile.lastName': 1,
					'emails': {
						$filter: {
							input: '$emails',
							as: 'email',
							cond: { $eq: [ '$$email.primary', true ] }
						}
					}
				}
			}
		]).toArray();
		return result;
	}
});