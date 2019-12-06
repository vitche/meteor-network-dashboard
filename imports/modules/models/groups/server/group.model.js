import { GroupCollection } from './group.collection';

class Group {
	constructor(collection) {
		this.collection = collection;
	}

	find(query, projection = {}) {
		return this.collection.find(query, projection);
	}

	findOne(query, projection = {}) {
		return this.collection.findOne(query, projection);
	}

	insert(query) {
		return this.collection.insert(query);
	}

	update(selector, query) {
		return this.collection.update(selector, query);
	}

	bulkInsert(query, parameters = { ordered: true }) {
		return this.collection.rawCollection().insert(query, parameters);
	}
}


export const GroupModel = new Group(GroupCollection);