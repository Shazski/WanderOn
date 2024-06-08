import { NextFunction, Request, Response } from "express";

export const userAuth = (req: Request, res: Response, next: NextFunction) => {
 if (!req.user) {
  throw new Error("Unauthorized!");
 }

 next();
};