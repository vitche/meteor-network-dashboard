
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const OrganizationsSchema = new SimpleSchema({
	title: { type: String, max: 100 },
	ownerId: { type: String },
	groupId: { type: String, optional: true },
	clusterId: { type: String, optional: true },
	verified: { type: Boolean, defaultValue: false },
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