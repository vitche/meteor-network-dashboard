import { Meteor } from 'meteor/meteor';
import { DevicesModel } from '../../models/devices/server/devices.model';

import { DEVICES_PUBLISH_ENUM } from '../both/devices.enum';

Meteor.publish(DEVICES_PUBLISH_ENUM.getDevicesList, function () {
	return DevicesModel.find();
});