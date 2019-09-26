import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict'
import * as _ from 'lodash';

import { ModalService } from "../../../ui-modal/client/service/modal.service";

import './groups-list.html';
import '../group-item/group-item';

Template.groupsListWidget.onCreated(function () {
	this.state = new ReactiveDict();

	this.groupsList = [];

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

	this.onSelectGroup = (groupId) => {
		const group = _.find(this.groupsList, (group) => group._id === groupId);
		Meteor.call('groups.method.getGroupUsers', { groupId }, (err, result) => {
			if (err) {
				throw new Error(err);
			}

			const users = result.map((user) => {
				return {
					_id: user._id,
					email: user.emails[0].address,
					firstName: user.profile.firstName,
					lastName: user.profile.lastName
				}
			});

			this.state.set('selectedGroup', { group, users });
		});
	};

	this.addChildGroup = (groupId) => {
		const parentGroup = _.find(this.groupsList, (group) => group._id === groupId);
		// TODO: make it as extended service for modals;
		ModalService.forkSubgroup(parentGroup)
	};

	this.deleteGroup = (groupId) => {
		// TODO: show modal window with confirmation;
	};

	this._init();
});

Template.groupsListWidget.helpers({
	isGroupsLoad: function () {
		return Template.instance().state.get('isGroupsLoading')
	},
	selectedGroup: function () {
		return Template.instance().state.get('selectedGroup');
	},
	groupsList: function () {
		return Template.instance().groupsList;
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



