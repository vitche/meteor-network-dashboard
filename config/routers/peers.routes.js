/**
 * Routers related to all Peers functionality
 */

FlowRouter.route('/peers', {
    name: 'peers.list',
    action: function (params, queryParams) {
        BlazeLayout.render('layout', { main: 'peerListWidget' });
    }
});

FlowRouter.route('/peers/:id', {
    name: 'peers.edit',
    action(params, query) {
        BlazeLayout.render('layout', { main: 'peerEditWidget' })
    }
});