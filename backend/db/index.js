import dotenv from "dotenv"
import mongoose from "mongoose"
dotenv.config();

const connectDatabase = async function(){
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB is connected'\n'Host: ${connectionInstance}`);
    } catch (error) {
        console.log("Database connection failed", error);
        process.exit(1);
    }
}

export { connectDatabase }