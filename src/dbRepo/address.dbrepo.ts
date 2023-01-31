import { Knex } from "knex";
import { UserRegistrationPayload } from "../routes/Auth/schemas/UserRegistrationPayloadSchema";
import AddressRepo, { Address } from "../repo/address.repo";

class DbAddressRepo implements AddressRepo{
    private db: Knex
    
    constructor(db: Knex){
        this.db = db
    }
   
    async addressRegistration(payload: UserRegistrationPayload): Promise<number | undefined> {

        const result = await this.db.insert({
            "address_name": payload.address,
            "lat": payload.lat,
            "lng": payload.lng,
            "is_user": payload.isUser
        }).into('address').returning('id')
        
        if(result.length < 0) return undefined
        else return result[0].id
    }

    async updateAddress(payload: Address, id: number): Promise<any> {
        const result = await this.db('address as a').update({
            'address_name': payload.addressName,
            'lat': payload.lat,
            'lng': payload.lng
        }).where('a.id','=', id)

        console.log(result)
        return result
    }

}

export default DbAddressRepo