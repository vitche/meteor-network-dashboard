/**
 * Routers related to all Peers functionality
 */

import { ROUTES_CONFIG } from '../../both/routes.config';

const devices = FlowRouter.group({
	prefix: ROUTES_CONFIG.devices.prefix,
});

devices.route(ROUTES_CONFIG.devices.list.path, {
	name: ROUTES_CONFIG.devices.list.name,
	action: function (params, queryParams) {
		BlazeLayout.render('layout', { main: 'devicesListWidget' });
	}
});