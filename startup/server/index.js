import './fixtures';
import './login.handler';

Meteor.publish('userPermissions', function (userPermissions) {
	const permissions = ServerSession.get('userPermissions');
	if (!permissions) {
		this.ready()
	}
	return [];
});