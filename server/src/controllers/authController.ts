import { NextFunction, Request, Response } from "express";
import { loginSchema, resgiterSchema } from "../utils/validation";
import ErrorResponse from "../utils/error/errorResponse";
import { findById, registerUser, userEmailExists, userNameExists } from "../services";
import { generateToken } from "../utils/jwt";
import { IUser } from "../interfaces";
import { cookieConfig } from "../lib/constants";
import { comparePassword } from "../utils/bcrypt/comparePassword";

// @route    POST api/v1/register
// @desc     Register user
// @access   Public

export const register = async (
 req: Request,
 res: Response,
 next: NextFunction
) => {
 const credentials = req.body;

 try {
  const { error, value } = resgiterSchema.validate(credentials);

  if (error) {
   return next(ErrorResponse.badRequest(error.details[0].message));
  }

  //check whether user email exists or not!
  const userExists = await userEmailExists(value?.email);

  if (userExists) {
   //if exists throw error with an message!
   return next(ErrorResponse.conflict("Email already exists"));
  }
  //check whether username exists or not!
  const usernameExists = await userNameExists(value.username);

  if (usernameExists) {
   //if exists throw error with an message!
   return next(ErrorResponse.conflict("Username already exists"));
  }
  //if username and email is not existing then creating new user!
  const newUser: IUser | boolean = await registerUser(value);

  if (!newUser || typeof newUser === "boolean") {
   return next(ErrorResponse.internalError("Internal Server error"));
  }

  const userPayload = {
   _id: String(newUser?._id),
   username: newUser?.username,
  };

  //generating jwt token for authentication
  const userToken = generateToken(userPayload);

  //storing auth token in cookie storage with cookie secure configurations and returning response to the client!
  return res.status(200).cookie("auth_token", userToken, cookieConfig).json({
   message: "user registration completed succesfully",
   data: value,
   success: true,
  });
 } catch (error) {
  //passing error to errorhandler middleware
  next(error);
 }
};


// @route    POST api/v1/login
// @desc     Login user
// @access   Public

export const login = async (
 req: Request,
 res: Response,
 next: NextFunction
) => {
 const credentials = req.body;

 try {
  //validing user data using Joi
  const { error, value } = loginSchema.validate(credentials);

  if (error) {
   return next(ErrorResponse.badRequest(error.details[0].message));
  }

  // check whether the user exists or not!
  const userExists: IUser | boolean = await userEmailExists(value?.email);

  // if not sending not found response!
  if (!userExists && typeof userExists === "boolean") {
   return next(ErrorResponse.notFound("Email or password is invalid"));
  }

  if (typeof userExists !== "boolean") {
   const isMatch = await comparePassword(value?.password, userExists.password);

   if (!isMatch) {
    return next(ErrorResponse.forbidden("Email or password is invalid"));
   }
   const userPayload = {
    _id: String(userExists?._id),
    username: userExists?.username,
   };

   //generating jwt token for authentication
   const userToken = generateToken(userPayload);
   res
    .status(200)
    .cookie("auth_token", userToken)
    .json({ message: "Login successful", data: userExists, success: true });
  } else {
   return next(ErrorResponse.notFound("Email or password is invalid"));
  }
 } catch (error) {
  next(error);
 }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
 ) => {
  try {
   const user = await findById(req.user?._id as string);
   res.status(200).json({ success: true, data: user, message: "success" });
  } catch (error) {
   next(error);
  }
 };
 export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
 ) => {
  try {
   res.clearCookie("auth_token");
   res.status(200).json({ success: true, message: "logout success" });
  } catch (error) {
   next(error);
  }
 };