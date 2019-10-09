import {FabricUserContext} from "./user-context";

export class FabricConnection {

    constructor(fabricClient, fabricCAClient) {
        this.fabricClient = fabricClient;
        this.fabricCAClient = fabricCAClient;
    }

    userContext(logOn) {
        return new FabricUserContext(this, logOn);
    }
}
