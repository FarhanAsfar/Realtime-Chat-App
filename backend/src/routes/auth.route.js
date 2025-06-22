import { Router } from "express";
import { SignIn, SignUp } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.route("/signup").post(SignUp);

authRouter.route("/signin").post(SignIn);

// authRouter.route("/logout").post();

export {
    authRouter
}