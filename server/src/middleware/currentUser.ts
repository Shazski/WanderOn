import { NextFunction, Request, Response } from "express";
import { IUserPayload } from "../interfaces/IUserPayload";
import { JWT_SECRET } from "../lib/envConfig";
import { generateToken, verifyToken } from "../utils/jwt";
import { cookieConfig } from "../lib/constants";

declare global {
 namespace Express {
  interface Request {
   user?: IUserPayload;
  }
 }
}

export const CurrentUser = async (
 req: Request,
 res: Response,
 next: NextFunction
) => {
 let user : any;

 try {
  const { auth_token } = req.cookies;

  if (!auth_token) {
   return next("Token is available");
  }

  if (auth_token) {
   user = await verifyToken(auth_token, String(JWT_SECRET));
  }

  if (user) {
   const jwtToken = generateToken({
    _id: user._id,
    username: user.username,
   });
   res.cookie("auth_token", jwtToken, cookieConfig);
  }

  req.user = user!;
  next();
 } catch (error) {
  next();
 }
};
