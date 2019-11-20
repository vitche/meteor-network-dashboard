import { DevicesSchema } from './devices.schema';

export const DevicesModel = new Mongo.Collection("devices");

DevicesModel.attachSchema(DevicesSchema);