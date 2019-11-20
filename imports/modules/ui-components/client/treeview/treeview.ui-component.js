import { Template } from 'meteor/templating';

import './treeview.ui-component.html';

Template.Treeview_component.onCreated(function () {
	this.onSelectCluster = Template.instance().data.onSelect
});

Template.Treeview_component.helpers({
	data: function () {
		return Template.instance().data.list
	},
	isHasChildren: function (item) {
		return item.childClustersIds && item.childClustersIds.length;
	},
	clusterItem: function (cluster) {
		const instance = Template.instance();
		return {
			list: cluster.childClustersIds,
			onSelect: instance.data.onSelect
		}
	}
});

Template.Treeview_component.events({
	'click .js-selected-item': function (event, template) {
		event.stopImmediatePropagation();
		const activeElem = $('#sep-treeview li.active');
		if (activeElem.length) {
			activeElem.removeClass('active');
		}

		$(event.currentTarget.parentNode).addClass('active');
		this.onSelect($(event.currentTarget).data('id'));

	}
});