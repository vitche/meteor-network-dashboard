import { ROUTES_CONFIG } from '../../both/routes.config';

/**
 * Routers related to all Organizations functionality
 */

const organizations = FlowRouter.group({
	prefix: ROUTES_CONFIG.organizations.prefix,
});

organizations.route(ROUTES_CONFIG.organizations.list.path, {
	name: ROUTES_CONFIG.organizations.list.name,
	action: function (params, queryParams) {
		BlazeLayout.render('layout', { main: 'Organization_page' });
	},
});