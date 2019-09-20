import './routes/dashboard.routes';
import './routes/peers.routes';
import './routes/groups.routes';
import './template.helpers'

FlowRouter.wait();
Tracker.autorun(() => {
	// if the roles subscription is ready, start routing
	// there are specific cases that this reruns, so we also check
	// that FlowRouter hasn't initalized already
	if (!FlowRouter._initialized && Roles.subscription.ready()) {
		FlowRouter.initialize();
	}
});
