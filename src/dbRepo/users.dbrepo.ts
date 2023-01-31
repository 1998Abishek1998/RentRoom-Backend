import { Knex } from "knex";
import UsersRepo, { IdInterface, ValidLogin } from "../repo/users.repo";
import { UserRegistrationPayload } from "../routes/Auth/UserRegistrationPayloadSchema";
import { compareSync, hashSync } from "bcrypt";

class DbUsersRepo implements UsersRepo{
    private db: Knex
    
    constructor(db: Knex){
        this.db = db
    }
   
    async userRegistration(payload: UserRegistrationPayload, id: IdInterface, citizenId: IdInterface): Promise<number | undefined> {
        
        const user = await this.db('users').insert({
            username: payload.username,
            role: payload.role,
            password: hashSync(payload.password, 10),
            first_name: payload.firstName,
            last_name: payload.lastName,
            email: payload.email,
            phone_number: payload.phoneNumber,
            address_id: id,
            citizenship_id: citizenId
        }).returning('id')

        if(user.length < 0) return undefined
        else{
            const id: number = user[0].id
            return user[0].id    
        }
    }

    async fetchUser(id: string): Promise<any| undefined>{
        const user = await this.db('users as u')
                        .select('u.id','u.role','u.username','u.first_name','u.last_name','u.email','u.phone_number', 'a.address_name','c.number','u.is_active','u.is_verified')
                        .join('address as a','a.id','u.address_id')
                        .join('citizenship_details as c','c.id','u.citizenship_id')
                        .where('u.id', id)
                        .first()

        if(!user) return undefined

        const payload = Object.assign({
            id: user.id,
            role: user.role,
            username: user.username,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            phoneNumber: user.phone_number,
            address: user.address_name,
            citizenshipNumber: user.number,
            isActive: user.is_active,
            isVerified: user.is_verified
        })
        return payload
    }

    async loginUser(payload: ValidLogin): Promise<number>{
        const validUsername: { id: number, password: string} = await this.db('users as u')
                .select('id','password')
                .where(builder => {
                    builder.where(`u.${payload.key}`, payload.username);
                    builder.where('u.is_active', true)
                }).first()
        
        if(!validUsername.id) return 0
        
        const comparePass = compareSync(payload.password, validUsername.password)
        if(!comparePass) return 0
        
        return validUsername.id
    }

}

export default DbUsersRepo