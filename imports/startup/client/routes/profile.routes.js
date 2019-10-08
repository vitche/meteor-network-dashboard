import { ROUTES_CONFIG } from '../../both/routes.config';

/**
 * Routers related to all Profile functionality
 */

const profileRoutes = FlowRouter.group({
	prefix: ROUTES_CONFIG.profile.prefix,
});

profileRoutes.route(ROUTES_CONFIG.profile.profile.path, {
	name: ROUTES_CONFIG.profile.profile.name,
	action: function (params, queryParams) {
		BlazeLayout.render('layout', { main: 'User_profile' });
	},
});