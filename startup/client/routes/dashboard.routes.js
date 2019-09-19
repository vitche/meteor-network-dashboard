import { ROUTES_CONFIG } from '../../both/routes.config';

/**
 * Routers related to all Dashboard functionality
 */

const dashboard = FlowRouter.group({
	prefix: ROUTES_CONFIG.dashboard.prefix,
});

dashboard.route(ROUTES_CONFIG.dashboard.list.path, {
	name: ROUTES_CONFIG.dashboard.list.name,
	action: function (params, queryParams) {
		BlazeLayout.render('layout', { main: 'dashboard' });
	},
});