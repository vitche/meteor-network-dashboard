export class FabricUserContext {

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

    async registerChild(membershipServiceProviderName, parentUser, affiliation, logOn) {

        let secret = await this._connection.fabricCAClient.register({
            enrollmentID: logOn,
            affiliation: affiliation
        }, parentUser);
        let enrollment = await this._connection.fabricCAClient.enroll({
            enrollmentID: logOn,
            enrollmentSecret: secret
        });
        let newUser = await this._connection.fabricClient.createUser({
            username: logOn,
            mspid: membershipServiceProviderName,
            cryptoContent: {
                privateKeyPEM: enrollment.key.toBytes(),
                signedCertPEM: enrollment.certificate
            }
        });
        return newUser;
    }

    async load() {
        return this._connection.fabricClient.getUserContext(this._logOn, true);
    }
}
