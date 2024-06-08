import { config } from "dotenv";
config()


export const PORT = process.env.PORT 
export const MONGO_URI = process.env.MONGO_URI
export const CLIENT_URL = "https://wanderon-jcho.onrender.com"
export const JWT_SECRET = process.env.JWT_SECRET
