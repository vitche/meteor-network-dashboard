import { EmailBase } from './email.base';

import './templates/invitation-email.template';

class EmailServiceClass extends EmailBase {
	constructor() {
		super()
	}

	sendEnrollmentEmail(userId) {
		try {
			Accounts.sendEnrollmentEmail(userId)
		} catch (err) {
			throw new Meteor.Error('email-send-error', err.message);
		}
	}
}

s
export const EmailService = new EmailServiceClass();