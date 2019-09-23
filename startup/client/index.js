import './routes/dashboard.routes';
import './routes/peers.routes';
import './routes/groups.routes';
import './template.helpers'

FlowRouter.wait();
const userHandler = Meteor.subscribe('userPermissions', ServerSession.get('userPermissions'));
Tracker.autorun(() => {
	if (userHandler.ready()) {
		if (!FlowRouter._initialized) {
			FlowRouter.initialize();
		}
	}
});
