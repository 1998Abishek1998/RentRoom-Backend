import { isValidEmail, isValidPhoneNumber, isValidUsername } from "../../../utils/validators"
import z from "../../../utils/zod"

const UserLoginPayloadSchema = z.object({
    username: z.string({ required_error: 'Please enter your username.'}).refine((val) => isValidEmail(val) || isValidPhoneNumber(val) || isValidUsername(val), 'Please provide valid username'),
    password: z.string({ required_error: 'Please enter your password.'}),
})

export type UserLoginPayload = z.infer<typeof UserLoginPayloadSchema>

export default UserLoginPayloadSchema