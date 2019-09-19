import { Template } from 'meteor/templating';
import * as _ from 'lodash';

import { PROTECTED_ELEMENTS } from '../../configs/roles/protected-elements';

Template.registerHelper('isAllow', (element) => {
	const roles = Session.get('userPermissions');

	if (!roles) return;

	if (!PROTECTED_ELEMENTS[element]) return;

	return !!_.intersection(PROTECTED_ELEMENTS[element], roles).length;
});
