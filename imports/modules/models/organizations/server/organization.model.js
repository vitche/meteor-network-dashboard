import { OrganizationCollection } from './organization.collection';

class Organization {
	constructor(collection) {
		this.collection = collection;
	}
}

export const OrganizationCollection = new Organization(OrganizationCollection);