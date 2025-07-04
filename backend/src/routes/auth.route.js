import { Router } from "express";
import { SignIn, SignOut, SignUp, checkAuth } from "../controllers/auth.controller.js";
import { verifyAccess } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.route("/signup").post(SignUp);

authRouter.route("/signin").post(SignIn);

authRouter.route("/signout").post(verifyAccess, SignOut);

authRouter.route("/check").get(verifyAccess, checkAuth);

export {
    authRouter
}