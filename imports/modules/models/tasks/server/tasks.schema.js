import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/**
 * Model of Clusters
 * Peers and Groups have 'many-to-many' relationships
 * @type {SimpleSchema}
 */
export const TasksSchema = new SimpleSchema({
	title: { type: String, max: 250 },
	description: { type: String, max: 10000, optional: true },
	time: { type: Object },
	'time.type': { type: String },
	'time.startDate': { type: Date, optional: true },
	'time.endDate': { type: Date, optional: true },
	'time.estimate': { type: Number, optional: true },
	'time.prolongation': { type: Boolean, defaultValue: false },
	executorType: { type: String },
	assignTo: { type: String, optional: true },
	priceRate: { type: Number, optional: true },
	devicesId: {type: Array},
	'devicesId.$': {type: String},
	creatorId: { type: String },
	organizationId: { type: String },
	status: { type: String, defaultValue: 'open' },
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