import { Mongo } from 'meteor/mongo';
import { TasksSchema } from './tasks.schema';
import { Factory } from 'meteor/dburles:factory';

export const TasksCollection = new Mongo.Collection('tasks');

TasksCollection.attachSchema(TasksSchema);

Factory.define('tasks', TasksCollection, {});