import { Meteor } from 'meteor/meteor';
import { DeviceCollection } from '../../models/devices/server/device.collection';

import { DEVICES_PUBLISH_ENUM } from '../both/devices.enum';

Meteor.publish(DEVICES_PUBLISH_ENUM.getDevicesList, function () {
	return DeviceCollection.find();
});