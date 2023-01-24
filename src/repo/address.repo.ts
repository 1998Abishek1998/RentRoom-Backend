import { CreateRoomPayload } from "../zodSchemas/CreateRoomPayloadSchema"
import { UserRegistrationPayload } from "../zodSchemas/UserRegistrationPayloadSchema"

interface AddressRepo{
    addressRegistration(payload: UserRegistrationPayload | CreateRoomPayload ): Promise<any>
}
  
export default AddressRepo
