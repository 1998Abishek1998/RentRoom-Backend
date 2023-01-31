import { CreateRoomPayload } from "../routes/Room/schemas/CreateRoomPayloadSchema"
import { UserRegistrationPayload } from "../routes/Auth/schemas/UserRegistrationPayloadSchema"

interface AddressRepo{
    addressRegistration(payload: UserRegistrationPayload | CreateRoomPayload ): Promise<any>
    updateAddress(payload: Address ,id: number): Promise<any>
}
  
export default AddressRepo

export interface Address{
    addressName: string,
    lat: number,
    lng: number
}