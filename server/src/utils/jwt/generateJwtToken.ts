import jwt from "jsonwebtoken";
import { IUserPayload } from "../../interfaces/IUserPayload";
import { JWT_SECRET } from "../../lib/envConfig";

export const generateToken = (payload: IUserPayload): string => {
 return jwt.sign(payload, String(JWT_SECRET), { expiresIn: "10d" });
};
