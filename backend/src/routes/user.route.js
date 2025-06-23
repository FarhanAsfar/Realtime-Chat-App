import { Router } from "express";
import { verifyAccess } from "../middlewares/auth.middleware.js";
import { updateProfile } from "../controllers/user.controller.js";

const userRouter = Router();


userRouter.route("/update-profile").put(verifyAccess, updateProfile);


export {
    userRouter
}