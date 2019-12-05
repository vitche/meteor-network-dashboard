import { DeviceCollection } from './device.collection';

export class Device {
	constructor(collection) {
		this.collection = collection;
	}

	find(query, projection) {
		return this.collection.find(query, projection);
	}

	findOne(query, projection) {
		return this.collection.findOne(query, projection)
	}

	insert(query) {
		return this.collection.insert(query);
	}
}

export const DeviceModel = new Device(DeviceCollection);