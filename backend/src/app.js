import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.middleware.js";
import { authRouter } from "./routes/auth.route.js";
import { userRouter } from "./routes/user.route.js";
import { messageRouter } from "./routes/message.route.js";


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());


app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);

app.use("/api/v1/message", messageRouter);

app.use(errorHandler)

export {app}