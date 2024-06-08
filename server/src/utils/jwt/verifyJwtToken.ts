import jwt from "jsonwebtoken";
import { IUserPayload } from "../../interfaces/IUserPayload";

export const verifyToken = (token: string, jwtSecret: string) => {
 return new Promise((resolve, reject) => {
  jwt.verify(token, jwtSecret, (err, decode) => {
   if (err) {
    reject(err);
   } else {
    resolve(decode as IUserPayload);
   }
  });
 });
};
