import { IUser } from "../interfaces";
import User from "../repository/models/userModel";

export const userEmailExists = async (
 email: string
): Promise<boolean | IUser> => {
 const userExists = await User.findOne({ email: email });

 if (!userExists) {
  return false;
 }

 return userExists;
};
export const userNameExists = async (
 username: string
): Promise<boolean | IUser> => {
 const userExists = await User.findOne({ username: username });

 if (!userExists) {
  return false;
 }

 return userExists;
};

export const registerUser = async (
 userCredentials: IUser
): Promise<IUser | boolean> => {
 const newUser = await User.create({
  ...userCredentials,
 });

 if (!newUser) {
  return false;
 }
 return newUser;
};

export const findById = async (id: string) => {
  try {
   const user = await User.findById(id);
   if (!user) return false;
   return user;
  } catch (error) {
   return false;
  }
 };