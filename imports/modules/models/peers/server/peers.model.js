import { PeersSchema } from './peers.schema';

export const PeersModel = new Mongo.Collection("peers");

PeersModel.attachSchema(PeersSchema);