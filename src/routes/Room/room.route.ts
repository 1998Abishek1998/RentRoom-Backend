import { Router } from "express";
import AppRouter from "../../interface/appRouter.interface";
import { createRoom, getAllRooms, getSingleRoom, updateRoom } from "./room.handler";
import validateschemaMiddleware from "../../middlewares/validateschema.middleware";
import CreateRoomPayloadSchema from "./schemas/CreateRoomPayloadSchema";
import { authenticate } from "../../middlewares/authentication.middleware";
import UpdateRoomPayloadSchema from "./schemas/UpdateRoomPayloadSchema";

class RoomRouter implements AppRouter{
    public path = '/room'
    public router = Router()

    constructor(){
        this.initializeRoutes()
    }

    private initializeRoutes(){
        
        this.router.route(`${this.path}`)
            .get(getAllRooms)
            .post(authenticate, validateschemaMiddleware(CreateRoomPayloadSchema), createRoom)

        this.router
            .route(`${this.path}/:roomId`)
            .get(authenticate, getSingleRoom)
            .put(authenticate ,validateschemaMiddleware(UpdateRoomPayloadSchema), updateRoom)
    }
}

export default RoomRouter