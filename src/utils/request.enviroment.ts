import AddressRepo from "../repo/address.repo";
import CitizenshipRepo from "../repo/citizenship.repo";
import RoomRepo from "../repo/room.repo";
import UsersRepo, { IUser } from "../repo/users.repo";

declare global {
    namespace Express {
        export interface Request {
            session?: {
                token?: string;
            },
            user: IUser,
            env: {
                usersRepo: UsersRepo,
                addressRepo: AddressRepo,
                citizenShipRepo: CitizenshipRepo,
                roomRepo: RoomRepo
            },
        }
    }
}

export {}