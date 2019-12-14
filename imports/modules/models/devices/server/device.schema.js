import { SimpleSchema } from 'meteor/aldeed:simple-schema';


export const DeviceSchema = new SimpleSchema({
	name: { type: String },
	osType: { type: String },
	osVersion: { type: String },
	status: { type: String },
	health: { type: Number },
	organizationId: { type: String },
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