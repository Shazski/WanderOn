import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import colors from "colors";
import { PORT } from "./lib/envConfig";
import { corsConfig } from "./lib/constants";
import mongoSanitize from "express-mongo-sanitize";
import { authRouter } from "./routes";
import { errorHandler } from "./utils/error/errorHandler";
import { connect } from "./repository";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsConfig));
app.use(mongoSanitize());

connect();

app.use("/api/v1/", authRouter());

app.use("*", (req, res, next) => {
 res.status(404).json({ message: "Api not found" });
});

app.use(errorHandler);

app.listen(PORT, () => {
 console.log(colors.blue(`Server listening to port ${PORT}`));
});
