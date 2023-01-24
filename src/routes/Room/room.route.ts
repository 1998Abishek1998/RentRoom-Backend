import { Router, Request, Response, NextFunction } from "express";
import AppRouter from "../../interface/appRouter.interface";
import { createRoom, getAllRooms } from "./room.handler";
import validateschemaMiddleware from "../../middlewares/validateschema.middleware";
import CreateRoomPayloadSchema from "../../zodSchemas/CreateRoomPayloadSchema";
import { authenticate } from "../../middlewares/authentication.middleware";

class RoomRouter implements AppRouter{
    public path = '/room'
    public router = Router()

    constructor(){
        this.initializeRoutes()
    }

    private initializeRoutes(){
        this.router.post(`${this.path}/:userId`,validateschemaMiddleware(CreateRoomPayloadSchema), createRoom)
        this.router.get(`${this.path}`, authenticate, getAllRooms)
    }
}

export default RoomRouter