import { ROLES_DICTIONARY } from '../../../../configs/roles/roles.dictionary';
import { RolesService } from '../../../roles/server/services/roles.service';
import { TasksModel } from '../../../models/tasks/server/tasks.model';
import { TASKS_PUBLICATIONS } from '../../both/tasks.publications-dict';

Meteor.publish(TASKS_PUBLICATIONS.getTasks, function () {
	const user = Meteor.user();
	if ( !user._id ) {
		throw Meteor.Error(403, 'User must be logged in');
	}
	
	// TODO: Return list of tickets depend on user permissions AND/OR type of tickets
	// const requiredPermissions = [
	// 	ROLES_DICTIONARY.private.superAdmin.alias,
	// 	ROLES_DICTIONARY.private.organizationOwner.alias,
	// ];
	//
	// if ( !RolesService.isAllowedAction(requiredPermissions) ) {
	// 	this.ready();
	// 	throw new Meteor.Error('You have not permissions for review groups');
	// }
	
	return TasksModel.findAll();
});