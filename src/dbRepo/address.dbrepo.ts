import { Knex } from "knex";
import { UserRegistrationPayload } from "../zodSchemas/UserRegistrationPayloadSchema";
import AddressRepo from "../repo/address.repo";

class DbAddressRepo implements AddressRepo{
    private db: Knex
    
    constructor(db: Knex){
        this.db = db
    }
   
    async addressRegistration(payload: UserRegistrationPayload): Promise<number | undefined> {

        const result = await this.db.insert({
            address_name: payload.address,
            lat: payload.lat,
            lng: payload.lng
        }).into('address').returning('id')
        
        if(result.length < 0) return undefined
        else return result[0].id
    }

}

export default DbAddressRepo