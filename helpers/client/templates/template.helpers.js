import { Template } from 'meteor/templating';
import * as _ from 'lodash';

import { PROTECTED_ELEMENTS } from '../../../configs/roles/protected-elements';
import { SERVER_SESSIONS_KEYS } from '../../../configs/server-session.keys';

const moment = require('moment');

Template.registerHelper('isAllow', (element) => {
	const roles = ServerSession.get(SERVER_SESSIONS_KEYS.userPermissions);

	if (!roles) return;

	if (!PROTECTED_ELEMENTS[element]) return;

	return !!_.intersection(PROTECTED_ELEMENTS[element], roles).length;
});

Template.registerHelper('dateFormat', (date, format) => {
	return moment(date).format('MM-DD-YYYY');
});
