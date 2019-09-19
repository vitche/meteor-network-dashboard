import './routes/dashboard.routes';
import './routes/peers.routes';
import './routes/groups.routes';
import './template.helpers'
import { Meteor } from 'meteor/meteor';
import { UsersCollection } from '../../modules/users/users.schema';
import * as _ from 'lodash';

// freeze routing in application until User roles  will not be loaded to Session
FlowRouter.wait();

const currentUserRoleHandler = Meteor.subscribe('currentUserRoles', Meteor.userId());

Tracker.autorun(() => {
	const roles = UsersCollection.find({ _id: Meteor.userId() }, { fields: { roles: 1 } }).fetch();

	if (currentUserRoleHandler.ready()) {
		if (roles.length) {
			const permissions = _.chain(roles[0].roles)
				.map((value) => value)
				.flatten()
				.uniq()
				.value();

			Session.set('userPermissions', permissions);
		}

		if (!FlowRouter._initialized) {
			FlowRouter.initialize();
		}
	}
});


