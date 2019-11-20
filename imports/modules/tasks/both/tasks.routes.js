export const TASKS_ROUTES = {
	prefix: '/tasks',
	list: {
		name: 'tasks.list',
		path: '/',
		permissions: []
	},
	info: {
		name: 'tasks.info',
		path: '/:id',
		permissions: [],
	}
};