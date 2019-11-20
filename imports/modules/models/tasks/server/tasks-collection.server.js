import { Mongo } from 'meteor/mongo';
import { TasksSchema } from './tasks.schema';

export const TasksCollection = new Mongo.Collection('tasks');

TasksCollection.attachSchema(TasksSchema);