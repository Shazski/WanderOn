import mongoose from "mongoose";
import { MONGO_URI } from "../lib/envConfig";
import color from "colors";
export const connect = () => {
 mongoose
  .connect(String(MONGO_URI))
  .then(() => {
   console.log(color.cyan("Database connect succesfully"));
  })
  .catch(() => {
   console.log(color.red("unable to connect database..."));
  });
};
