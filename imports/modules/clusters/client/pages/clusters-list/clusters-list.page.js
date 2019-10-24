import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './clusters-list.page.html';

const CLUSTERS = [
	{
		title: 'Default cluster',
		childClustersIds: [
			{
				title: 'Kharkiv All',
				childClustersIds: [
					{
						title: 'Kharkiv 1',
						childClustersIds: []
					},
					{
						title: 'Kharkiv 2',
						childClustersIds: []
					}
				]
			},
			{
				title: 'Dnipro All',
				childClustersIds: [
					{
						title: 'Dnipro 1',
						childClustersIds: [
							{
								title: 'Dnipro 1 Server 1',
								childClustersIds: []
							}
						]
					}
				]
			}
		]
	}
];


Template.Cluster_page.onCreated(function () {
	this.state = new ReactiveDict();

	this.onSelectCluster = (cluster) => {
		console.log(cluster);
		this.state.set('selectedCluster', cluster);
	}

});

Template.Cluster_page.helpers({
	clusters: function () {
		return CLUSTERS;
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