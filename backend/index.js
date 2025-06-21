import dotenv from "dotenv";
dotenv.config();

import { connectDatabase } from "./db/index.js";
import { app } from "./app.js";

connectDatabase()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on PORT: ${process.env.PORT}`);
    })
})
.catch(error => {
    console.log("Server Error!", error);
    process.exit(1);
})

