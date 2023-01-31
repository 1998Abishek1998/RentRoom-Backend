import { UserLoginPayload } from "../routes/Auth/schemas/UserLoginPayloadSchema"
import { UserRegistrationPayload } from "../routes/Auth/schemas/UserRegistrationPayloadSchema"

interface UsersRepo{
    userRegistration(payload: UserRegistrationPayload, id: IdInterface, citizenId: IdInterface): Promise<number | undefined>
    fetchUser(id: string | number): Promise<SimpleUser | IUser>
    loginUser(payload: ValidLogin): Promise<number>
    isUserValid(payload: BeforeRegistration): Promise<any>
}
  
export default UsersRepo

export interface ValidLogin{
    key: string,
    username: string,
    password: string
}

export interface BeforeRegistration{
    phoneNumber: string,
    username: string,
    email: string
}

export interface IdInterface {
    id: number,
}

export interface SimpleUser{
    id: string,
    role: string,
    is_active: boolean
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    address: string,
    citizenshipNumber: string,
    isActive: boolean,
    isVerified: boolean
}

export interface IUser {
    id: string,
    role: string,
    is_active: boolean
}

export enum LoginKey {
    EMAIL = 'email',
    PHONE = 'phone_number',
    USERNAME = 'username',
}