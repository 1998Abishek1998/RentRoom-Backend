import { CreateRoomPayload } from "../routes/Room/CreateRoomPayloadSchema"
import { UserRegistrationPayload } from "../routes/Auth/UserRegistrationPayloadSchema"

interface AddressRepo{
    addressRegistration(payload: UserRegistrationPayload | CreateRoomPayload ): Promise<any>
}
  
export default AddressRepo
