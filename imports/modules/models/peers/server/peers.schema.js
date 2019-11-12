import { SimpleSchema } from 'meteor/aldeed:simple-schema';


export const PeersSchema = new SimpleSchema({
	name: { type: String },
	type: { type: String }
});