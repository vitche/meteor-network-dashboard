import {FabricConnection} from "./connection";

const FabricClient = require('fabric-client');
const FabricCAClient = require('fabric-ca-client');

export class FabricConnectionFactory {

    constructor(storePath) {
        this._storePath = storePath;
    }

    async connect(uri, CAName) {

        let keyValueStore = await FabricClient.newDefaultKeyValueStore({
            path: this._storePath
        });

        let fabricClient = new FabricClient();
        fabricClient.setStateStore(keyValueStore);
        let cryptoSuite = FabricClient.newCryptoSuite();

        // Use the same location for the state store (where the users' certificate are kept)
        // and the crypto store (where the users' keys are kept)
        let cryptoKeyStore = FabricClient.newCryptoKeyStore({path: this._storePath});
        cryptoSuite.setCryptoKeyStore(cryptoKeyStore);
        fabricClient.setCryptoSuite(cryptoSuite);
        let tlsOptions = {
            trustedRoots: [],
            verify: false
        };

        let fabricCAClient = new FabricCAClient(uri, tlsOptions, CAName, cryptoSuite);
        return new FabricConnection(fabricClient, fabricCAClient);
    }
}
