import { Router } from "express";
import { authController } from "../controllers";
import { CurrentUser } from "../middleware/currentUser";
import { userAuth } from "../middleware/userAuth";

export default () => {
 const router = Router();

 router.route("/").get(CurrentUser, userAuth, authController.getUser);
 router.route("/register").post(authController.register);
 router.route("/login").post(authController.login);
 router.route("/logout").get(authController.logout);

 return router;
};
