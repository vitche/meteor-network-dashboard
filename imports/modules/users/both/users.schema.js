import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const UsersCollection = Meteor.users;

UsersCollection.allow({
	insert: () => false,
	update: () => false,
	remove: () => false,
});

UsersCollection.deny({
	insert: () => true,
	update: () => true,
	remove: () => true,
});

const UserProfile = new SimpleSchema({
	firstName: {
		type: String,
		optional: true
	},
	lastName: {
		type: String,
		optional: true
	},
	organizationId: {
		type: String,
		optional: true
	},

});

const UserSchema = new SimpleSchema({
	emails: { type: Array },
	'emails.$': { type: Object },
	'emails.$.address': { type: String, regEx: SimpleSchema.RegEx.Email },
	'emails.$.verified': { type: Boolean, defaultValue: false, optional: true },
	'emails.$.primary': { type: Boolean, defaultValue: false, optional: true },
	password: { type: String, optional: true },
	profile: {
		type: UserProfile,
		optional: true,
		blackbox: true
	},
	// this field must be by default as we sent verification tokens via emails
	// account-password plugin save all tokens here
	services: { type: Object, optional: true, blackbox: true },
	roles: { type: Object, optional: true, blackbox: true },
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
}, {
	clean: {
		filter: false,
		autoConvert: false,
		removeEmptyStrings: true,
		trimStrings: true,
		removeNullsFromArrays: true,
	}
});

UsersCollection.attachSchema(UserSchema);