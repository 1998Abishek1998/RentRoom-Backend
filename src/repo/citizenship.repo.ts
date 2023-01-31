import { UserRegistrationPayload } from "../routes/Auth/schemas/UserRegistrationPayloadSchema"

interface CitizenshipRepo{
    citizenshipRegistration(payload: UserRegistrationPayload): Promise<any>
}
  
export default CitizenshipRepo
