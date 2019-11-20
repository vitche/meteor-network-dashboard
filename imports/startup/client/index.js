import './routes/dashboard.routes';
import './routes/devices.routes';
import './routes/groups.routes';
import './routes/profile.routes';
import './routes/organizations.routes';
import './routes/clusters.routers';
import './routes/tasks.routers';

import '../../helpers/client/templates/template.helpers';
import { SERVER_SESSIONS_KEYS } from '../../configs/server-session.keys';

FlowRouter.wait();
const userHandler = Meteor.subscribe('userPermissions', ServerSession.get(SERVER_SESSIONS_KEYS.userPermissions));
Tracker.autorun(() => {
	if (userHandler.ready()) {
		if (!FlowRouter._initialized) {
			FlowRouter.initialize();
		}
	}
});
