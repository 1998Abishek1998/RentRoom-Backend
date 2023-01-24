import 'dotenv/config'
import { cleanEnv, port, str } from 'envalid'

const env = cleanEnv(process.env, {
    NODE_ENV: str({ default: 'development'}),
    DB_NAME: str({ default: 'sql_learn'}),
    DB_HOST: str({ default: 'localhost' }),
    DB_PASSWORD: str({ default: 'Password@123'}),
    DB_USER: str({ default: 'root'}),
    DB_PORT: port({ default: 3306 }),
    SERVER_PORT: port({ default: 8000}),
    JWT_SECRET_KEY: str({ default: 'somesecret@$%^&*' }),
    JWT_EXPIRES_IN: str({ default: '2D'}),
    IMAGE_CLOUD_NAME: str(),
    IMAGE_API_KEY: str(),
    IMAGE_API_SECRET: str()
})

export default env