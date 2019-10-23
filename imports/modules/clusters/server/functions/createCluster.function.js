import { Meteor } from 'meteor/meteor';
import { ClusterModule } from '../../../models/clusters/server/clusters.model';

export const createCluster = async (title) => {
	const user = Meteor.user();

	const organizationId = user.profile.organizationId;

	let cluster;
	try {
		cluster = await ClusterModule.insert(title, organizationId);
	} catch (err) {
		console.error(err.message);
		throw new Meteor.Error(400, `Can't create a new cluster`);
	}

	return cluster;
};