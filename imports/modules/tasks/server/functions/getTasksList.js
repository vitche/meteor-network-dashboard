import { RolesHelpers } from '../../../roles/server/helpers/roles.helpers';
import { TasksModel } from '../../../models/tasks/server/tasks.model';

export const getTasksList = function () {
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
};