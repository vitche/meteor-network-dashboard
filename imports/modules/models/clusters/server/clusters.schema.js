import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/**
 * Model of Clusters
 * Peers and Groups have 'many-to-many' relationships
* @type {SimpleSchema}
 */
export const ClustersSchema = new SimpleSchema({
	taskId: { type: String },
	organizationId: { type: String },
	devicesId: { type: Array, optional: true },
	'devicesId.$': { type: String, optional: true },
	groupId: { type: String, optional: true },
	archived: {type: Boolean, optional: true},
	createdAt: {
		type: Date,
		autoValue() {
			if ( this.isInsert ) {
				return new Date();
			} else if ( this.isUpsert ) {
				return { $setOnInsert: new Date() };
			} else {
				this.unset();
			}
		},
	},
});