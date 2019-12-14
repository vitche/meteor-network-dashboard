import { FabricConnectionFactory } from '../connection-factory';

const path = require('path');

const certificatePath = path.resolve(process.env.PWD, 'private', '.certificates');

const hlProxy = require('../../../../configs/proxy/server/hl-proxy');

class HLConnectionService {
	constructor({ connectionFactory }) {
		this.connectionFactory = connectionFactory;

		this.connection = null;
	}

	async connect() {
		if ( this.connection ) {
			console.log('The connection to HL has already been established.');
			return;
		}

		try {
			this.connection = await this.connectionFactory.connect(hlProxy.connection.url, hlProxy.connection.CAName);
		} catch ( err ) {
			console.error('HyperLedger Connection Error: ', err);
			throw new Error(err.message);
		}
	}

	async register(email, userPassword, organizationId) {
		let userContext = this.connection.userContext(email);

		let rootUser;

		try {
			rootUser = await userContext.load();
		} catch ( err ) {
			console.error('HyperLedger UserContext Load Error :', err);
			throw new Error(err.message);
		}

		if ( rootUser && rootUser.isEnrolled() ) {
			throw new Error('User has already registered in HL');
		}

		let HLUser;

		try {
			HLUser = await userContext.register(organizationId, userPassword);
		} catch ( err ) {
			console.log('HyperLedger Register User Error', err);
			throw new Error(err.message);
		}

		return HLUser;
	}

	/**
	 *
	 * @param orgId - to which user will be belong
	 * @param orgOwnerEmail - organization owner's email for finding root user of organization
	 * @param userType - employee/freelancer. certificate can be created for freelancer during his work on task
	 * @param userEmail - user email for creating new user
	 */
	async registerChild(orgId, orgOwnerEmail, userType, userEmail) {
		let orgOwnerContext = this.connection.userContext(orgOwnerEmail);

		let orgOwnerUser, newEmployeeUser;

		try {
			orgOwnerUser = await orgOwnerContext.load();
		} catch ( err ) {
			console.error('HyperLedger UserContext Load Error :', err);
			throw new Error(err.message);
		}

		if ( !orgOwnerUser || orgOwnerUser.isEnrolled() ) {
			throw new Error(`User ${ orgOwnerEmail } doesn't exist in HL`);
		}

		let newUserContext = this.connection.userContext(userEmail);

		try {
			newEmployeeUser = await newUserContext.load();
		} catch ( err ) {
			console.error('HyperLedger UserContext Load Error :', err);
			throw new Error(err.message);
		}

		// todo: do we need verify if user already enrolled, especially for freelancers


		let HLUser;

		try {
			HLUser = await newUserContext.registerChild(orgId, orgOwnerUser, userType, userEmail);
		} catch ( err ) {
			console.log('HyperLedger Register User Error', err);
			throw new Error(err.message);
		}

		return HLUser;
	}

}

const connectionFactory = new FabricConnectionFactory(certificatePath);

export const HLService = new HLConnectionService({ connectionFactory });