import { TasksModel } from '../../../models/tasks/server/tasks.model';
import { TASKS_PUBLICATIONS } from '../../both/tasks.publications-dict';
import { RolesHelpers } from '../../../roles/server/helpers/roles.helpers';

Meteor.publish(TASKS_PUBLICATIONS.getTasks, function () {
	const user = Meteor.user();
	if ( !user._id ) {
		throw Meteor.Error(403, 'User must be logged in');
	}
	
	if ( RolesHelpers.isSuperAdmin() ) {
		return TasksModel.findAll();
	}
	
	if ( RolesHelpers.isOrganizationOwner() ) {
		return TasksModel.findTasksForOrganizationOwner(user.profile.organizationId);
	}
	
	if ( RolesHelpers.isOrganizationMember() ) {
		return TasksModel.findTasksForOrganizationMember(user.profile.organizationId)
	}
	
	return TasksModel.findPublicTasks()
});