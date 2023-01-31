import { isValidEmail, isValidPhoneNumber } from "../../../utils/validators"
import z from "../../../utils/zod"

const UserRegistrationPayloadSchema = z.object({
    username: z.string({ 'required_error': 'Please enter your username.'}),
    firstName: z.string({ 'required_error': 'Please enter your first name.'}),
    lastName: z.string({ 'required_error': 'Please enter your last name.'}),
    email: z.string({ 'required_error': 'Please enter your email.'}).refine((val) => isValidEmail(val), 'Please enter a valid email.'),
    phoneNumber: z.string({ 'required_error': 'Please enter your phone number.'}).refine((val) => isValidPhoneNumber(val), 'Please enter a valid phone number.'),
    role: z.string({ required_error: 'Please provide a role.' }).default('user'),
    password: z.string({ required_error: 'Please enter your password.'}),
    address: z.string({ required_error: 'Please enter your address.'}),
    lat: z.number({ required_error: 'Please provide address latitude. '}),
    lng: z.number({ required_error: 'Please provide address longitude. '}),
    citizenshipNumber: z.string({ required_error: 'Please enter your citizenship number '}),
    isUser: z.boolean({'required_error': 'Please verify the address is of user or room'})
})

export type UserRegistrationPayload = z.infer<typeof UserRegistrationPayloadSchema>

export default UserRegistrationPayloadSchema