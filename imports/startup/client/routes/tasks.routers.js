import { ROUTES_CONFIG } from '../../both/routes.config';


const tasksRoutes = FlowRouter.group({
	prefix: ROUTES_CONFIG.tasks.prefix
});

tasksRoutes.route(ROUTES_CONFIG.tasks.list.path, {
	name: ROUTES_CONFIG.tasks.list.name,
	action: function (params, queryParams) {
		BlazeLayout.render('layout', { main: 'Tasks_page' })
	}
});

tasksRoutes.route(ROUTES_CONFIG.tasks.info.path, {
	name: ROUTES_CONFIG.tasks.info.name,
	action: function (params, queryParams) {
		BlazeLayout.render('layout', { main: 'Task_info' });
	}
});