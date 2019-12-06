import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { RolesHelpers } from '../../roles/server/helpers/roles.helpers';
import { Mixins } from '../../../helpers/server/mixins'
import { ROLES_DICTIONARY } from '../../../configs/roles/roles.dictionary';
import { UsersCollection } from '../../users/both/users.schema';
import { GroupModel } from '../../models/groups/server/group.model';

const DEFAULT_GROUPS = require('../../../configs/default-data/groups.config');

export const getGroupsList = new ValidatedMethod({
	name: 'groups.method.getGroupsList',
	mixins: [ Mixins.loggedIn, Mixins.roles ],
	roles: [
		ROLES_DICTIONARY.private.superAdmin.alias,
		ROLES_DICTIONARY.private.organizationOwner.alias,
		ROLES_DICTIONARY.public.allowReviewGroup.alias
	],
	validate: null,
	run() {

		if (RolesHelpers.isSuperAdmin()) {
			return GroupModel.find({}).fetch();
		}

		const user = Meteor.user();
		const userGroups = Object.keys(user.roles);

		return GroupModel.find({
			_id: { $in: userGroups },
			alias: { $ne: DEFAULT_GROUPS.allUsers.alias }
		}).fetch();
	},
});

export const forkGroup = new ValidatedMethod({
	name: 'groups.method.forkGroup',
	mixins: [ Mixins.loggedIn, Mixins.roles ],
	roles: [
		ROLES_DICTIONARY.private.superAdmin.alias,
		ROLES_DICTIONARY.private.organizationOwner.alias,
		ROLES_DICTIONARY.public.allowAddChildGroup.alias,
	],
	validate: new SimpleSchema({
		title: { type: String },
		permissions: { type: Array },
		'permissions.$': { type: String },
		parentGroupId: { type: String },
		organizationId: { type: String, optional: true }
	}).validator(),
	async run(forkedGroup) {
		const result = await GroupModel.insert(forkedGroup);
		return result;
	}
});

export const getGroupUsers = new ValidatedMethod({
	name: 'groups.method.getGroupUsers',
	mixins: [ Mixins.loggedIn, Mixins.roles ],
	roles: [
		ROLES_DICTIONARY.private.superAdmin.alias,
		ROLES_DICTIONARY.private.organizationOwner.alias,
		ROLES_DICTIONARY.public.allowReviewGroup.alias,
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
			{ $unwind: '$roles' }, // {key : 'group name', value : [permi]}
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