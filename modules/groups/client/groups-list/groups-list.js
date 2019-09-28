import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict'
import * as _ from 'lodash';

import { GroupsCollection } from '../../both/groups.schema';
import { GroupService } from '../services/groups.service';
import { ModalService } from '../../../ui-modal/client/service/modal.service';

import './groups-list.html';
import '../group-item/group-item';

Template.groupsListWidget.onCreated(function () {
	this.state = new ReactiveDict();
	this.groupsList = [];
	this.selectedGroupUsers = [];

	// TODO: catch error?

	const groupsHandler = this.subscribe('groups.publish.getGroupList');

	this.autorun(() => {
		if (groupsHandler.ready()) {
			this.groupsList = GroupsCollection.find().fetch();
			this.state.set('isGroupsLoading', true);
		}
	});


	this._init = () => {
		this.state.set('isGroupsLoading', false);
		Meteor.call('groups.method.getGroupsList', (err, result) => {
			if (err) {
				throw new Error(err);
			}

			this.groupsList = result;
			this.state.set('isGroupsLoading', true);
		});
	};

	this.onSelectGroup = () => {
		const group = Template.instance().data.group;
		GroupService.getGroupUsers(group._id, (users) => {
			this.selectedGroupUsers = users;
			this.state.set('selectedGroup', { group, users })
		})
	};

	this.addChildGroup = () => {
		ModalService.forkSubgroup({ parentGroup: Template.instance().data.group })
	};

	this.deleteGroup = () => {
	};

});

Template.groupsListWidget.helpers({
	isGroupsLoad: function () {
		return Template.instance().state.get('isGroupsLoading')
	},
	selectedGroup: function () {
		return Template.instance().state.get('selectedGroup');
	},
	groupsList: function () {
		return GroupsCollection.find();
	},
	groupItem: function (group) {
		const instance = Template.instance();
		return {
			group,
			onSelect: instance.onSelectGroup,
			onAddChildGroup: instance.addChildGroup,
			onDeleteGroup: instance.deleteGroup,
		}
	}
});

Template.groupsListWidget.events({});



