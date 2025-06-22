import { urlencoded } from "express";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";

const generateAccessToken = async function(userId){
    try {
        const user = await User.findById(userId);

        if(!user){
            throw new ApiError(404, "User not found to generate token for");
        }
        const accessToken = user.generateAccessToken();
        await user.save({validateBeforeSave: false})

        return accessToken;
    } catch (error) {
        throw new ApiError(500, "Token generation failed");
    }
}

const SignUp = asyncHandler(async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const {fullName, email, password} = req.body;

    if([fullName, email, password].some((field) => field.trim() == "")){
        throw ApiError(400, "All fields are required");
    }

    const userExist = await User.findOne({
        $or: [
            {fullName},
            {email}
        ]
    });

    if(userExist){
        throw ApiError(409, "User already exists");
    }

    const user = await User.create({
        fullName,
        email,
        password
    });

    const createdUser = await User.findById(user._id).select("-password");

    if(!createdUser){
        throw ApiError(500, "User signup failed!");
    }

    session.commitTransaction();
    session.endSession();

    return res.status(200).json(
        new ApiResponse(200, createdUser, "User signed up successfully")
    )
})


export{
    SignUp,
}