import { FabricConnectionFactory } from '../connection-factory';

const path = require('path');

const hlProxy = require('../../../../configs/proxy/server/hl-proxy');

class HLConnectionService {
	constructor(connectionFactory) {
		this.connection = null;
		this.connectionFactory = connectionFactory;
	}


	async connect() {
		if ( this.connection ) {
			console.log('The connection to HL has already been established.');
			return;
		}

		try {
			this.connection = await this.connectionFactory.connect(hlProxy.connection.url, hlProxy.connection.CAName);
		} catch ( err ) {
			console.error('Cannot establish connection to HyperLadger', err.message);
			throw new Error(err.message);
		}
	}
}