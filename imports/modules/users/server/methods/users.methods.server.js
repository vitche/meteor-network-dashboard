import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { EmailService } from '../../../../utils/server/email/email.service';
import { USER_METHODS_ENUM } from '../../both/user-methods.enum';
import { UsersCollection } from '../../both/users.schema';

export const sendEnrollmentLetter = new ValidatedMethod({
	name: 'users.sendEnrollmentLetter',
	validate: new SimpleSchema({
		userId: { type: String }
	}).validator(),
	run({ userId }) {
		return EmailService.sendEnrollmentEmail(userId)
	}
});

export const getUserByIdMethod = new ValidatedMethod({
	name: USER_METHODS_ENUM.GET_USER_BY_ID,
	validate: new SimpleSchema({
		id: { type: String }
	}).validator(),
	async run({ id }) {
		return UsersCollection.findOne({ _id: id })
	}
});
