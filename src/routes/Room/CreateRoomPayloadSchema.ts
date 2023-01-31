import { isValidPhoneNumber } from "../../utils/validators"
import z from "../../utils/zod"

const CreateRoomPayloadSchema = z.object({
    description: z.string({ 'required_error': 'Please enter your description.'}),
    phoneNumber: z.string({ 'required_error': 'Please enter your phone number.'}).refine((val) => isValidPhoneNumber(val), 'Please enter a valid phone number.'),
    roomType: z.string({ required_error: 'Please provide a room type.' }),
    address: z.string({ required_error: 'Please enter your address.'}),
    isParkingAvailable: z.boolean({ required_error: 'Please provide valid parking status.' }).optional(),
    lat: z.number({ required_error: 'Please provide address latitude. '}),
    lng: z.number({ required_error: 'Please provide address longitude. '}),
    roomName: z.string().optional().default('TestRoom'),
    price: z.number({ required_error: 'Please enter the price for the room.'})
})

export type CreateRoomPayload = z.infer<typeof CreateRoomPayloadSchema>

export default CreateRoomPayloadSchema