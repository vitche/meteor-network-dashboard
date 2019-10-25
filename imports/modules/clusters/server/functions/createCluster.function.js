import { Meteor } from 'meteor/meteor';
import { ClusterModel } from '../../../models/clusters/server/clusters.model';

export const createCluster = async ({ title, description }) => {
	const user = Meteor.user();

	const organizationId = user.profile.organizationId;

	let clusterId, cluster;
	try {
		clusterId = await ClusterModel.insert({ title, description, organizationId });
		cluster = await ClusterModel.findById(clusterId);
	} catch (err) {
		console.error(err.message);
		throw new Meteor.Error(400, `Can't create a new cluster`);
	}

	return cluster;
};