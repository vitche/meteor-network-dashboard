/**
 * Routes related to all Auth functionality
 */

FlowRouter.route('/signin', {
    name: 'signin',
    action: function (params, queryParams) {
        BlazeLayout.render('login');
    }
});