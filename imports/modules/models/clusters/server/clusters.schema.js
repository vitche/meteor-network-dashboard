import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/**
 * Model of Clusters
 * Peers and Groups have 'many-to-many' relationships
 * @type {SimpleSchema}
 */
export const ClustersSchema = new SimpleSchema({
	title: { type: String, max: 50 },
	description: { type: String, max: 100, optional: true },
	alias: { type: String, optional: true },
	organizationId: { type: String },
	peers: { type: Array, optional: true },
	'peers.$': { type: String, optional: true },
	groups: { type: Array, optional: true },
	'groups.$': { type: String, optional: true },
	childClustersIds: { type: Array, optional: true },
	'childClustersIds.$': { type: String, optional: true },
	createdAt: {
		type: Date,
		autoValue() {
			if (this.isInsert) {
				return new Date();
			} else if (this.isUpsert) {
				return { $setOnInsert: new Date() };
			} else {
				this.unset();
			}
		},
	},
});