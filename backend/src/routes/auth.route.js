import express from "express"

const authRouter = Router();

authRouter.route("/signup").post();

authRouter.route("/signin").post();

authRouter.route("/logout").post();