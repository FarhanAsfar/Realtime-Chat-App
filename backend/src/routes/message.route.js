import { Router } from "express";
import { verifyAccess } from "../middlewares/auth.middleware.js";

const messageRouter = Router();


messageRouter.route("/users").get(verifyAccess, getAllUsers);


export {
    messageRouter,
}