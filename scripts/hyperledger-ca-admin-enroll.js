const path = require('path');
const FabricClient = require('fabric-client');
const FabricCAClient = require('fabric-ca-client');

const logOn = "admin";
const password = "adminpw";
const membershipServiceProvider = "Org1MSP";
let storePath = path.join(__dirname, '../.certificates');

let fabricClient = new FabricClient();
let fabricCAClient = null;
let administratorUser = null;

FabricClient.newDefaultKeyValueStore({
    path: storePath
}).then((keyValueStore) => {
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
    // TODO: change to HTTPS when the CA is running TLS enabled
    fabricCAClient = new FabricCAClient('http://localhost:7054', tlsOptions, 'ca.example.com', cryptoSuite);
    return fabricClient.getUserContext('admin', true);
}).then((previousUserContext) => {
    if (previousUserContext && previousUserContext.isEnrolled()) {
        administratorUser = previousUserContext;
        return null;
    } else {
        // Need to enroll it with the CA server
        return fabricCAClient.enroll({
            enrollmentID: logOn,
            enrollmentSecret: password
        }).then((enrollment) => {
            return fabricClient.createUser({
                username: logOn,
                mspid: membershipServiceProvider,
                cryptoContent: {
                    privateKeyPEM: enrollment.key.toBytes(),
                    signedCertPEM: enrollment.certificate
                }
            });
        }).then((user) => {
            administratorUser = user;
            return fabricClient.setUserContext(administratorUser);
        }).catch((error) => {
            console.error('Failed to enroll and persist admin. Error: ' + error.stack ? error.stack : error);
            throw new Error('Failed to enroll admin');
        });
    }
}).then(() => {
    console.log('Assigned the admin user to the fabric client ::' + administratorUser.toString());
}).catch((error) => {
    console.error('Failed to enroll admin: ' + error);
});
