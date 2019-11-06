import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/**
 * Model of Clusters
 * Peers and Groups have 'many-to-many' relationships
 * @type {SimpleSchema}
 */
export const TasksSchema = new SimpleSchema({
	title: { type: String, max: 250 },
	description: { type: String, max: 1000, optional: true },
	time: { type: Object },
	'time.startDate': { type: Date },
	'time.endDate': { type: Date },
	executorType: { type: String },
	priceRate: { type: Number },
	creatorId: { type: String },
	organizationId: { type: String },
	groupId: { type: String, optional: true },
	clusterId: { type: String, optional: true },
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