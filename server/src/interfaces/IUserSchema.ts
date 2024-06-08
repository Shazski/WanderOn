import { ObjectId } from "mongoose";

export interface IUser extends Document {
 username: string;
 email: string;
 password: string;
 _id: ObjectId;
 comparePassword(password: string, encodedPassowrd: string): Promise<boolean>;
}
