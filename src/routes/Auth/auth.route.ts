import { Router } from "express";
import AppRouter from "../../interface/appRouter.interface";
import validateschemaMiddleware from "../../middlewares/validateschema.middleware";
import UserRegistrationPayloadSchema from "./schemas/UserRegistrationPayloadSchema";
import { login, signUp } from "./auth.handlers";
import UserLoginPayloadSchema from "./schemas/UserLoginPayloadSchema";
import { beforeRegistration } from "../../middlewares/authentication.middleware";

class AuthRouter implements AppRouter{
    public path = '/auth'
    public router = Router()

    constructor(){
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.post(`${this.path}/login`, validateschemaMiddleware(UserLoginPayloadSchema) ,login) 
        this.router.post(`${this.path}/signup`, validateschemaMiddleware(UserRegistrationPayloadSchema), beforeRegistration ,signUp)
    }

}

export default AuthRouter