import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/**
 * Model of Clusters
 * Peers and Groups have 'many-to-many' relationships
 * @type {SimpleSchema}
 */
export const ClustersSchema = new SimpleSchema({
	title: { type: String, max: 50 },
	description: { type: String, max: 100, optional: true },
	peers: { type: Array },
	'peers.$': { type: String },
	groups: { type: Array },
	'groups.$': { type: String },
	organizationId: { type: String },
	childClustersIds: { type: Array },
	'childClustersIds.$': { type: String },
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