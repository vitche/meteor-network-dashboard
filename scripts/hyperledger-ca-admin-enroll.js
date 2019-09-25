const path = require('path');
const FabricClient = require('fabric-client');
const FabricCAClient = require('fabric-ca-client');

class FabricConnection {

    constructor(fabricClient, fabricCAClient) {
        this.fabricClient = fabricClient;
        this.fabricCAClient = fabricCAClient;
    }

    userContext(logOn) {
        return new FabricUserContext(this, logOn);
    }
}

class FabricConnectionFactory {

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
        let cryptoKeyStore = FabricClient.newCryptoKeyStore({path: storePath});
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

class FabricUserContext {

    constructor(connection, logOn) {
        this._connection = connection;
        this._logOn = logOn;
    }

    async register(membershipServiceProviderName, password) {

        // Need to enroll it with the CA server
        let enrollment = await this._connection.fabricCAClient.enroll({
            enrollmentID: this._logOn,
            enrollmentSecret: password
        });
        let user = await this._connection.fabricClient.createUser({
            username: this._logOn,
            mspid: membershipServiceProviderName,
            cryptoContent: {
                privateKeyPEM: enrollment.key.toBytes(),
                signedCertPEM: enrollment.certificate
            }
        });

        return this._connection.fabricClient.setUserContext(user);
    }

    async load() {
        return this._connection.fabricClient.getUserContext(this._logOn, true);
    }
}

let storePath = path.join(__dirname, '../.certificates');

let connectionFactory = new FabricConnectionFactory(storePath);
connectionFactory.connect('http://localhost:7054', 'ca.example.com').then((connection) => {
    let userContext = connection.userContext('admin');
    userContext.load().then((previousUserContext) => {
        if (previousUserContext && previousUserContext.isEnrolled()) {
            console.log('Previous user context loaded:', previousUserContext);
        } else {
            userContext.register('Org1MSP', 'adminpw').then((newUser) => {
                console.log('Registered a new user:', newUser);
            });
        }
    });
});
