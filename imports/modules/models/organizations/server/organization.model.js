import { OrganizationCollection } from './organization.collection';

class Organization {
	constructor(collection) {
		this.collection = collection;
	}
	
	 find(query = {}, projection = {}) {
		return  this.collection.find(query, { fields : projection})
	}
	
	insert(query) {
		return this.collection.insert(query)
	}
}

export const OrganizationModel = new Organization(OrganizationCollection);