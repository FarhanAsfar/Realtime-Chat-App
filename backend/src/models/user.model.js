import mongoose from "mongoose";
import bcryptjs from "bcryptjs"
import { ApiError } from "../utils/apiError";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    fullName: {
        type: String,
        required: [true, "Enter your full name"],
        lowercase: true,
        trim: true,
        minLength: 4,
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: 4,
    },
    profilePic: {
        type: String,
        default: "",
    },
}, {timestamps: true});


userSchema.pre("save", async function(req, res, next){
    if(!this.isModified("password")){
        return next();
    }

    this.password = await bcryptjs.hash(this.password, 10);
    next();
})

userSchema.methods.isPassword = async function(req, res, next){
    if(!password || !this.password){
        throw ApiError(400, "Cannot match your password");
    }
    return await bcryptjs.compare(password, this.password);
}

const User = mongoose.model("User", userSchema);

export {
    User,
}