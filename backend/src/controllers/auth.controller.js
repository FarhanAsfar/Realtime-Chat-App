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

    if([fullName, email, password].some((field) => field?.trim() === "")){
        throw new ApiError(400, "All fields are required");
    }

    const userExist = await User.findOne({
        $or: [
            {fullName},
            {email}
        ]
    });

    if(userExist){
        throw new ApiError(409, "User already exists");
    }

    const user = await User.create({
        fullName,
        email,
        password
    });

    const createdUser = await User.findById(user._id).select("-password");

    if(!createdUser){
        throw new ApiError(500, "User signup failed!");
    }

    session.commitTransaction();
    session.endSession();

    return res.status(200).json(
        new ApiResponse(200, createdUser, "User signed up successfully")
    )
})

const SignIn = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        throw new ApiError(400, "Email and Password are required");
    }

    const user = await User.findOne({email});

    if(!user){
        throw new ApiError(404, "User not found");
    }

    const isPasswordValid = await user.isPassword(password);

    if(!isPasswordValid){
        throw new ApiError(400, "Password is not correct");
    }

    const accessToken = await generateAccessToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password");

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .json(
        new ApiResponse(200, {User: loggedInUser, accessToken}, `${user.fullName} logged in successfully`)
    );
})

const SignOut = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    await User.findByIdAndUpdate(
        userId,
        {
            $set: {accessToken: undefined}
        }
    )

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res.status(200)
    .clearCookie("accessToken", options)
    .json(
        new ApiResponse(200, {}, `${req.user.fullName} logged out`)
    )
})

const checkAuth = asyncHandler(async(req, res) =>{
    const user = req.user;

    if(!user){
        throw new ApiError(400, "CheckAuth controller error");
    }

    return res.status(200).json(user);
})


export{
    SignUp,
    SignIn,
    SignOut,
    checkAuth,
}