import { DEVICE_METHODS } from '../../both/device.methods.enum';

class DeviceServiceClass {
	constructor() {
	}

	async createDevice() {
		return Meteor.callPromise(DEVICE_METHODS.addDevice)
	}
}

export const DeviceService = new DeviceServiceClass();