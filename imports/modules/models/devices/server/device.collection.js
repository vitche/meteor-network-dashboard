import { DeviceSchema } from './device.schema';

export const DeviceCollection = new Mongo.Collection("devices");

DeviceCollection.attachSchema(DeviceSchema);