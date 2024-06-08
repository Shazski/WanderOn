import mongoose, { Schema } from "mongoose";
import { IUser } from "../../interfaces";
import bcrypt from "bcrypt";

const UserSchema: Schema<IUser> = new Schema(
 {
  username: { type: String, required: true, unique: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
 },
 {
  timestamps: true,
 }
);

UserSchema.pre("save", function (next) {
 const user = this;

 if (!user.isModified("password") || !user.password) return next();

 bcrypt.hash(user?.password as string, 10, (err: any, hash: string) => {
  if (err) return next(err);

  user.password = hash;
  next();
 });
});

function transform(doc: any, ret: any, options: any) {
 delete ret.password;
 delete ret.__v;
 return ret;
}

UserSchema.set("toJSON", { transform });

const User = mongoose.model<IUser>("Users", UserSchema);

export default User;
