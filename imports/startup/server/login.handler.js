import * as _ from 'lodash';
import { SERVER_SESSIONS_KEYS } from '../../configs/server-session.keys';

Accounts.onLogin((data) => {
	if (data.user.roles) {
		const permissions = _.chain(data.user.roles)
			.map((value) => value)
			.flatten()
			.uniq()
			.value();

		ServerSession.set(SERVER_SESSIONS_KEYS.userPermissions, permissions);
	}
});