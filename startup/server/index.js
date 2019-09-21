import './fixtures';
import './login.handler';

Meteor.publish('some', function (userId) {
    const per = ServerSession.get('userPermissions')
    if (!per) {
        this.ready()
    }
    return [];
})