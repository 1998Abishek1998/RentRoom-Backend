import express, { Application, json, urlencoded } from "express";
import AppRouter from "./interface/appRouter.interface";
import helmet from "helmet";
import cors from 'cors'
import env from "./utils/env";
import morgan from "morgan";
import { errorMiddleware } from "./middlewares/error.middleware";
import AppError from "./utils/AppError";
import DbUsersRepo from "./dbRepo/users.dbrepo";
import db from "./db/dbConfig";
import DbAddressRepo from "./dbRepo/address.dbrepo";
import DbCitizenshipRepo from "./dbRepo/citizenship.derepo";
import DbRoomRepo from "./dbRepo/room.dbrepo";

class App {
    public express: Application
    public port: number

    constructor(routers: AppRouter[], port: number){
        this.express = express()
        this.port = port
        
        this.initializeMiddleware()
        this.initializeRouters(routers)
        this.initializeErrorHandling()
    }

    private initializeMiddleware(): void {
        this.express.use(helmet())
        this.express.use(cors())
        this.express.use(urlencoded({ extended: false }))
        this.express.use(json())
        if(env.NODE_ENV === 'development') this.express.use(morgan('combined'))
        
        this.express.use((req: express.Request, res, next) => {
            req.env = {
              usersRepo: new DbUsersRepo(db),
              addressRepo: new DbAddressRepo(db),
              citizenShipRepo: new DbCitizenshipRepo(db),
              roomRepo: new DbRoomRepo(db)
            };
            next();
          });
    }

    private initializeRouters(routers: AppRouter[]): void {
        routers.forEach((route) => this.express.use('/api', route.router ))
    }

    private initializeErrorHandling(): void{
        this.express.all('*', (req, _res, next) => {
            next(new AppError(404, `Can't find ${req.originalUrl} on this server!`));
        })
        this.express.use(errorMiddleware)
    }

    public listen(): void{
        this.express.listen(this.port, () => console.log(`App listening on port: ${this.port}`))
    }
}

export default App