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
import fs from "fs"

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

// if(process.env.NODE_ENV === "production"){
//     app.use(express.static(path.join(__dirname, "../frontend/dist")))

//     app.get("/:wildcard*", (req, res) => {
//         res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
//     })
// }
if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "../frontend/dist");

  // Serve static files from dist
  app.use(express.static(distPath));

  // Fallback to index.html for unmatched routes
  app.use((req, res, next) => {
    const indexPath = path.join(distPath, "index.html");

    // Make sure index.html exists before sending
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send("Frontend not built");
    }
  });
}

export {app}