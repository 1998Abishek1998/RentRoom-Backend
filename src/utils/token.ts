import { Secret, sign, verify, VerifyErrors } from "jsonwebtoken";
import Token from "../interface/token.interface";
import { IUser } from "../repo/users.repo";
import env from "./env";

export const createToken = (user: IUser): string => {
    return sign(
        {
            id: user.id,
            role: user.role
        },
        env.JWT_SECRET_KEY as Secret,
        {
            expiresIn: env.JWT_EXPIRES_IN
        }
    )
}

export const verifyToken = async(
    token: string
): Promise<VerifyErrors | Token> => {
    return new Promise((resolve, reject) => {
        verify(token, env.JWT_SECRET_KEY as Secret, (err, payload) => {
            if(err) return reject(err)
            else resolve(payload as Token)
        })
    })
}