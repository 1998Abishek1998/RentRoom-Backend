import { isValidPhoneNumber } from "../../../utils/validators";
import z from "../../../utils/zod";

const UpdateRoomPayloadSchema = z.object({
    description: z.string().optional(),
    phoneNumber: z.string({ 'required_error': 'Please enter your phone number.'}).refine((val) => isValidPhoneNumber(val), 'Please enter a valid phone number.').optional(),
    roomType: z.string({ required_error: 'Please provide a room type.' }).optional(),
    address: z.string({ required_error: 'Please enter your address.'}).optional(),
    isParkingAvailable: z.boolean({ required_error: 'Please provide valid parking status.' }).optional(),
    lat: z.number({ required_error: 'Please provide address latitude. '}).optional(),
    lng: z.number({ required_error: 'Please provide address longitude. '}).optional(),
    roomName: z.string().optional().default('TestRoom').optional(),
    price: z.number({ required_error: 'Please enter the price for the room.'}).optional(),
    isVerified: z.boolean().optional(),
    isAvailable: z.boolean().optional(),
    roomSlug: z.string().optional(),
    images: z.string().optional(),
    isActive: z.boolean().optional()
})

export type UpdateRoomPayload = z.infer<typeof UpdateRoomPayloadSchema>

export default UpdateRoomPayloadSchema