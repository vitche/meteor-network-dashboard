import './fixtures';
import './login.handler';
import { SERVER_SESSIONS_KEYS } from '../../configs/server-session.keys';

Meteor.publish('userPermissions', function (userPermissions) {
	const permissions = ServerSession.get(SERVER_SESSIONS_KEYS.userPermissions);
	if (!permissions) {
		this.ready()
	}
	return [];
});