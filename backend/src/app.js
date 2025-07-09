import dotenv from "dotenv";
dotenv.config();

import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.middleware.js";
import { authRouter } from "./routes/auth.route.js";
import { userRouter } from "./routes/user.route.js";
import { messageRouter } from "./routes/message.route.js";

import path from "path";

const __dirname = path.resolve();
const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended:true}))
app.use(cookieParser());


app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);

app.use("/api/v1/message", messageRouter);

app.use(errorHandler)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}

export {app}