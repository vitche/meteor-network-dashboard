import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const OrganizationsSchema = new SimpleSchema({
	title: { type: String, max: 100 },
	ownerId: { type: String },
	groupId: { type: String, optional: true },
	clusterId: { type: String, optional: true },
	verified: { type: Boolean, defaultValue: false },
	defaultSettings: { type: Boolean, defaultValue: true },
	settings: { type: Object },
	'settings.address_1': { type: String, defaultValue: '' },
	'settings.address_2': { type: String, defaultValue: '' },
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