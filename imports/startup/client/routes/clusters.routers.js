import { ROUTES_CONFIG } from '../../both/routes.config';

const clusters = FlowRouter.group({
	prefix: ROUTES_CONFIG.clusters.prefix
});

clusters.route(ROUTES_CONFIG.clusters.list.path, {
	name: ROUTES_CONFIG.clusters.list.name,
	action: function (params, queryParams) {
		BlazeLayout.render('layout', { main: 'Cluster_page' });
	}
});