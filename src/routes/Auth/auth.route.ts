import { Router } from "express";
import AppRouter from "../../interface/appRouter.interface";
import validateschemaMiddleware from "../../middlewares/validateschema.middleware";
import UserRegistrationPayloadSchema from "./UserRegistrationPayloadSchema";
import { login, signUp } from "./auth.handlers";
import UserLoginPayloadSchema from "./UserLoginPayloadSchema";

class AuthRouter implements AppRouter{
    public path = '/auth'
    public router = Router()

    constructor(){
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.post(`${this.path}/login`, validateschemaMiddleware(UserLoginPayloadSchema) ,login) 
        this.router.post(`${this.path}/signup`, validateschemaMiddleware(UserRegistrationPayloadSchema), signUp)
    }
}

export default AuthRouter