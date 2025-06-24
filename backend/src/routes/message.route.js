import { Router } from "express";
import { verifyAccess } from "../middlewares/auth.middleware.js";
import { getAllUsers } from "../controllers/message.controller.js";

const messageRouter = Router();


messageRouter.route("/users").get(verifyAccess, getAllUsers);
messageRouter.route("/:id").get(verifyAccess, getMessages);


export {
    messageRouter,
}