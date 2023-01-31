import { UserRegistrationPayload } from "../routes/Auth/UserRegistrationPayloadSchema"

interface CitizenshipRepo{
    citizenshipRegistration(payload: UserRegistrationPayload): Promise<any>
}
  
export default CitizenshipRepo
