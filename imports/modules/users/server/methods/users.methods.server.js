import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { EmailService } from '../../../../utils/server/email/email.service';

export const sendEnrollmentLetter = new ValidatedMethod({
	name: 'users.sendEnrollmentLetter',
	validate: new SimpleSchema({
		userId: { type: String }
	}).validator(),
	run({ userId }) {
		return EmailService.sendEnrollmentEmail(userId)
	}
});