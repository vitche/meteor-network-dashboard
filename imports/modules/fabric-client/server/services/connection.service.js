import { FabricConnectionFactory } from '../connection-factory';

const path = require('path');
const fs = require('fs');

const certificatePath = path.resolve('../', __dirname, '.certificate');
console.log(certificatePath)

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
}

// const connectionFactory = new FabricConnectionFactory('./certificate')
//
// export const HLService = new HLConnectionService({ connectionFactory });