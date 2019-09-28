import * as _ from 'lodash';

Accounts.onLogin((data) => {
	if (data.user.roles) {
		const permissions = _.chain(data.user.roles)
			.map((value) => value)
			.flatten()
			.uniq()
			.value();

		ServerSession.set('userPermissions', permissions);
	}
});