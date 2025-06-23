import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { cloudinary } from "../utils/cloudinary.js";



const updateProfile = asyncHandler(async (req, res) => {
    const {profilePic} = req.body;

    if(typeof profilePic !== 'string'){
        console.log("not string");
    }

    const user = req.user?._id;

    if(!user){
        throw new ApiError(404, "Can't update profile, please, login again");
    }

    if(!profilePic){
        throw new ApiError(400, "Invalid profile picture");
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(profilePic);

    if(!cloudinaryResponse){
        throw new ApiError(400, "Picture upload failed");
    }

    const updatedUser = await User.findByIdAndUpdate(user, {profilePic:cloudinaryResponse.secure_url}).select("-password");

    // await user.save({validateBeforeSave: false});

    return res.status(200).json(
        new ApiResponse(200, {updatedUser}, "Profile picture updated")
    )
});

export{
    updateProfile,
}