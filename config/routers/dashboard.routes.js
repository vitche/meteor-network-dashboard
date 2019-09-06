/**
 * Routers related to all Dashboard functionality
 */

FlowRouter.route('/', {
    name: 'dashboard.list',
    action:function (params, queryParams) {
        BlazeLayout.render('layout', {main: 'dashboard'});
    }
});