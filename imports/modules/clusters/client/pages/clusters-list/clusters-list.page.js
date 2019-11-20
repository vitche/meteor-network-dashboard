import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './clusters-list.page.html';


Template.Cluster_page.onCreated(function () {
	this.state = new ReactiveDict();

	this.onSelectCluster = (cluster) => {
		this.state.set('selectedCluster', cluster);
	}

});

Template.Cluster_page.helpers({
	clusters: function () {
		return [];
	},
	clustersData: function (clusters) {
		const instance = Template.instance();
		return {
			list: clusters,
			onSelect: instance.onSelectCluster,
		}
	},
	isSelected: function() {
		return Template.instance().state.get('selectedCluster');
	}
});

Template.Cluster_page.events({});