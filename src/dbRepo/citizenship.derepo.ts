import { Knex } from "knex";
import { UserRegistrationPayload } from "../routes/Auth/schemas/UserRegistrationPayloadSchema";
import CitizenshipRepo from "../repo/citizenship.repo";

class DbCitizenshipRepo implements CitizenshipRepo{
    private db: Knex
    
    constructor(db: Knex){
        this.db = db
    }
   
    async citizenshipRegistration(payload: UserRegistrationPayload): Promise<number | undefined> {

        const result = await this.db.insert({
            number: payload.citizenshipNumber
        }).into('citizenship_details').returning('id')
        
        if(result.length < 0) return undefined
        else return result[0].id
    }

}

export default DbCitizenshipRepo