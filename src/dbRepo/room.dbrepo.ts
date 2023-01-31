import { Knex } from "knex";
import RoomRepo, { RoomsFilter } from "../repo/room.repo";
import { CreateRoomPayload } from "../routes/Room/schemas/CreateRoomPayloadSchema";
import { IdInterface } from "../repo/users.repo";
import { UpdateRoomPayload } from "../routes/Room/schemas/UpdateRoomPayloadSchema";
import { LooseObject } from "../interface/LooseObject";

class DbRoomRepo implements RoomRepo{
    private db : Knex

    constructor(db: Knex){
        this.db = db
    }
    async updateRooms(payload: UpdateRoomPayload, id: number): Promise<any> {
        let val: LooseObject = {}
        if(payload.phoneNumber) val.phone_number = payload.phoneNumber
        if(payload.description) val.description = payload.description
        if(payload.isActive) val.is_active = payload.isActive
        if(payload.isVerified) val.is_verified = payload.isVerified
        if(payload.isAvailable) val.is_available = payload.isAvailable
        if(payload.isParkingAvailable) val.is_parking_available = payload.isParkingAvailable
        if(payload.roomSlug) val.room_slug = payload.roomSlug
        if(payload.roomType) val.room_type = payload.roomType
        if(payload.images) val.images = payload.images
        if(payload.roomName) val.room_name = payload.roomName
        if(payload.price) val.price = payload.price
        console.log(val,'val')
        const room = await this.db('rooms as r').update(val).where('r.id','=', id)

        return room   
    }

    async createRoom(payload: CreateRoomPayload , addressId: IdInterface, userId: string): Promise<any> {
        const room = await this.db('rooms').insert({
            description: payload.description,
            address_id: addressId,
            user_id: userId,
            phone_number: payload.phoneNumber,
            room_slug: `${payload.roomName}-${payload.roomType}-${payload.price}`,
            room_type: payload.roomType,
            price: payload.price,
            room_name: payload.roomName,
            is_parking_available: payload.isParkingAvailable
        }).returning('id')

        if(room.length < 0) return undefined
        else return room[0].id
    }

    async fetchRooms(filter: RoomsFilter){
        const offset = Number(filter?.offset ?? 0);
        const limit = Number(filter?.limit ?? 10);
    
        const query = this.db('rooms as r')
                .join('users as u', 'u.id','r.user_id')
                .join('address as a','a.id', 'r.address_id')
                .where((builder) => {
                    if (filter.roomType) {
                        builder.where('r.room_type', filter.roomType);
                    }
                    if (filter.id) {
                        builder.where('r.id', filter.id);
                    }
                    
                    if (filter.isActive) {
                        builder.where('r.is_active', filter.isActive);
                    }
                    if (filter.isAvailable) {
                        builder.where('r.is_available', filter.isAvailable);
                    }
                    if (filter.isVerified) {
                        builder.where('r.is_verified', filter.isVerified);
                    }
                    if (filter.isParkingAvaible) {
                        builder.where('r.is_parking_available', filter.isParkingAvaible);
                    }
                    if (filter.query) {
                        builder.andWhere(afterAndBuilder => {
                          afterAndBuilder.orWhereILike('r.room_name', `%${filter.query}%`)
                        });
                    }
                })

        const [ rooms, [{ total }] ] = await Promise.all([
            query
            .clone()
            .offset(offset)
            .limit(limit)
            .select(
              `r.id`,
              `r.user_id as user_id`,
              `r.address_id as address_id`,
              `u.username`,
              `r.phone_number as room_contact_number`,
              `u.phone_number`,
              `r.description`,
              `r.is_active`,
              `r.is_verified`,
              `r.is_available`,
              `r.is_parking_available`,
              `r.room_slug`,
              `r.room_type`,
              `r.images`,
              `a.address_name`,
            )
            ,
            query.clone().count('*', { as: 'total' }),
        ])

        const payload = rooms.map((itm) => {
            let val = Object.assign({
                id: itm.id,
                userId: itm.user_id,
                addressId: itm.address_id,
                username: itm.username,
                phoneNumber: itm.phone_number,
                description: itm.description,
                isActive: itm.is_active,
                isVerified: itm.is_verified,
                isAvailable: itm.is_available,
                isParkingAvaible: itm.is_parking_available,
                roomSlug: itm.room_slug,
                roomType: itm.room_type,
                images: itm.images,
                addressName: itm.address_name,
                roomName: itm.room_name
                })
            return val
        })

        return {
            offset: offset,
            limit: limit,
            total: rooms.length,
            room: payload
        }
    }

    async fetchSingleRoom(id: Number): Promise<any> {
        const room = await this.db('rooms as r').select().where('r.id','=', id).first()
        return room
    }
}

export default DbRoomRepo