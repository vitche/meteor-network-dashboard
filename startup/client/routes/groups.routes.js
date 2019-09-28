/**
 * Routers related to all Groups functionality
 */
import { ROUTES_CONFIG } from '../../both/routes.config';

const groups = FlowRouter.group({
	prefix: ROUTES_CONFIG.groups.prefix
});

groups.route(ROUTES_CONFIG.groups.list.path, {
	name: ROUTES_CONFIG.groups.list.name,
	action: function (params, queryParams) {
		BlazeLayout.render('layout', { main: 'groupsListWidget' })
	}
});