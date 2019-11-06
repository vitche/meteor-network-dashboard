import { Template } from 'meteor/templating';
import * as _ from 'lodash';

import { PAGE_PERMISSIONS } from '../../../configs/roles/protected-elements';
import { SERVER_SESSIONS_KEYS } from '../../../configs/server-session.keys';

const moment = require('moment');

Template.registerHelper('isAllow', (element) => {
	const roles = ServerSession.get(SERVER_SESSIONS_KEYS.userPermissions);
	
	if ( !roles ) return;
	
	if ( !PAGE_PERMISSIONS[element] ) return;
	
	return !!_.intersection(PAGE_PERMISSIONS[element], roles).length;
});

Template.registerHelper('dateFormat', (date, format) => {
	let defaultTime = 'MM-DD-YYYY';
	if ( format ) {
		defaultTime = format
	}
	return moment(date).format(format || defaultTime);
});

Template.registerHelper('isVerified', (verified) => {
	let html;
	if ( verified ) {
		html = `<span class="label label-success">Approved</span>`
	} else {
		html = `<span class="label label-warning">Waiting for approve</span>`
	}
	return Spacebars.SafeString(html);
});

Template.registerHelper('isAutoProlongation', (value) => {
	return value ? 'Yes' : 'No';
});