import { CLIENT_URL } from "./envConfig";

export const corsConfig = {
  origin:CLIENT_URL,
  methods:["GET","POST","PUT","PATCH","DELETE"],
  credentials:true
}
export const cookieConfig = {
  secure: true,
  httpOnly: true,
  maxAge: 1000 * 60 * 60 * 24,
  sameSite: false,
};