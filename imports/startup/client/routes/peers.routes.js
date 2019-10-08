/**
 * Routers related to all Peers functionality
 */

import { ROUTES_CONFIG } from '../../both/routes.config';

const peers = FlowRouter.group({
	prefix: ROUTES_CONFIG.peers.prefix,
});

peers.route(ROUTES_CONFIG.peers.list.path, {
	name: ROUTES_CONFIG.peers.list.name,
	action: function (params, queryParams) {
		BlazeLayout.render('layout', { main: 'peerListWidget' });
	}
});

peers.route(ROUTES_CONFIG.peers.edit.path, {
	name: ROUTES_CONFIG.peers.edit.name,
	action(params, query) {
		BlazeLayout.render('layout', { main: 'peerEditWidget' })
	}
});