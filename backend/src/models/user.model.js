import mongoose from "mongoose";

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

const User = mongoose.model("User", userSchema);

export {
    User,
}