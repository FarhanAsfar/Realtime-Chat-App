import dotenv from "dotenv";
dotenv.config();

import { connectDatabase } from "./db/index.js";
import { server } from "../src/utils/socket.js";

connectDatabase()
.then(() => {
    server.listen(process.env.PORT, () => {
        console.log(`Server is running on PORT: ${process.env.PORT}`);
    })
})
.catch(error => {
    console.log("Server Error!", error);
    process.exit(1);
})

