import { NextFunction, Request, Response, Router } from "express";
import AppRouter from "../../interface/appRouter.interface";
import { responseHandler } from "../../utils/catchAndThrow";
import AppError from "../../utils/AppError";
import { deleteAddress, deleteCitizenship, updateAddress, updateCitizenship, updateUser } from "./user.handlers";

class UserRouter implements AppRouter{
    public path = '/user'
    public router = Router()

    constructor(){
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.route(`${this.path}/:id`)
            .get(this.fetchUser)
            .patch(updateUser)
        this.router.route(`${this.path}/address/:id`)
            .patch(updateAddress)
            .delete(deleteAddress)

        this.router.route(`${this.path}/citizenship/:id`)
            .patch(updateCitizenship)
            .delete(deleteCitizenship)
    }

    private async fetchUser(req: Request, res: Response, next: NextFunction){
        const userRepo = req.env.usersRepo
        const user = await userRepo.fetchUser(req.params.id)
        if(!user) return next(new AppError(404, 'User not found'))
        responseHandler('login successfull',{ user },res, 200)        
    }
}

export default UserRouter