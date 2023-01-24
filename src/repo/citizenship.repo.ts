import { UserRegistrationPayload } from "../zodSchemas/UserRegistrationPayloadSchema"

interface CitizenshipRepo{
    citizenshipRegistration(payload: UserRegistrationPayload): Promise<any>
}
  
export default CitizenshipRepo
