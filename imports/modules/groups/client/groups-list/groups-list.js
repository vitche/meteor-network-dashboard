import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import * as _ from 'lodash';

import { GroupCollection } from '../../../models/groups/client/group.collection';
import { GroupService } from '../services/groups.service';
import { ModalService } from '../../../ui-modal/client/service/modal.service';

import './groups-list.html';
import '../group-item/group-item';

Template.groupsListWidget.onCreated(function () {
	this.state = new ReactiveDict();
	this.state.set('groups', []);
	this.state.set('isGroupsLoading', true);

	const groupsHandler = this.subscribe('groups.publish.getGroupList');

	this.autorun(() => {
		if ( groupsHandler.ready() ) {
			const groupsList = GroupCollection.find().fetch();

			this.state.set('groups', groupsList);
			this.state.set('isGroupsLoading', false);
		}
	});

	this.onSelectGroup = () => {
		const group = Template.instance().data.group;
		GroupService.getGroupUsers(group._id, (users) => {
			this.state.set('selectedGroup', { group, users });
		});
	};

	this.addChildGroup = () => {
		ModalService.forkSubgroup({ parentGroup: Template.instance().data.group });
	};

	this.deleteGroup = () => {
	};

});

Template.groupsListWidget.helpers({
	isGroupsLoad: function () {
		return Template.instance().state.get('isGroupsLoading');
	},
	selectedGroup: function () {
		return Template.instance().state.get('selectedGroup');
	},
	groupsList: function () {
		return Template.instance().state.get('groups').length && Template.instance().state.get('groups');
	},
	groupItem: function (group) {
		const instance = Template.instance();
		return {
			group,
			onSelect: instance.onSelectGroup,
			onAddChildGroup: instance.addChildGroup,
			onDeleteGroup: instance.deleteGroup,
		};
	}
});

Template.groupsListWidget.events({});



