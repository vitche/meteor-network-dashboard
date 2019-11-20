import { SimpleSchema } from 'meteor/aldeed:simple-schema';


export const DevicesSchema = new SimpleSchema({
	name: { type: String },
	type: { type: String }
});