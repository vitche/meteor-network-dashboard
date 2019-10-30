import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/**
 * Model of Clusters
 * Peers and Groups have 'many-to-many' relationships
 * @type {SimpleSchema}
 */
export const TasksSchema = new SimpleSchema({
	title: { type: String, max: 50 },
	description: { type: String, max: 100, optional: true },
	time: { type: Object },
	'time.startDate': { type: Date },
	'time.endDate': { type: Date },
	executorType: { type: String },
	priceRate: {type: Number},
	groupId: {type: String},
	clusterId: {type: String},
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