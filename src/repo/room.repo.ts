import { PaginationFilter } from "../interface/pagination.interface"
import { CreateRoomPayload } from "../routes/Room/schemas/CreateRoomPayloadSchema"
import { UpdateRoomPayload } from "../routes/Room/schemas/UpdateRoomPayloadSchema"
import { IdInterface } from "./users.repo"

interface RoomRepo{
    createRoom(payload: CreateRoomPayload, addressId: IdInterface, userId: string): Promise<number | undefined>
    fetchRooms(filter: RoomsFilter): Promise<any>
    updateRooms(payload: UpdateRoomPayload, id: number): Promise<any>
    fetchSingleRoom(id: Number): Promise<any>
}

export default RoomRepo

export interface RoomsFilter extends Pick<PaginationFilter, 'query'> {
    isParkingAvaible?: boolean
    isActive?: boolean
    offset?: number
    limit?: number
    id?: number;
    ids?: number[];
    roomType?: string;
    isAvailable?: boolean;
    isVerified?: boolean;
    price?:number,
    roomName?:string
}

export interface Room{
    id: number,
    userId: number,
    addressId: number,
    username: string,
    phoneNumber: number,
    description: string,
    isActive: boolean,
    isVerified: boolean,
    isAvailable: boolean,
    isParkingAvaible: boolean,
    roomSlug: string,
    roomType: string,
    images: string,
    addressName: string,
}