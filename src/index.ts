import 'dotenv/config'
import App from './app'
import AuthRouter from './routes/Auth/auth.route'
import UserRouter from './routes/Users/user.route'
import RoomRouter from './routes/Room/room.route'

const app = new App(
    [
        new RoomRouter(),
        new AuthRouter(),
        new UserRouter(),
    ],
    Number(process.env.SERVER_PORT)
)

app.listen()