import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";


const getAllUsers = asyncHandler(async (req, res) => {
    const loggedInUserId = req.user._id;

    if(!loggedInUserId){
        throw new ApiError(404, "Please sign in to your account");
    }

    //get every users but the loggedInUser for the sidebar
    const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password"); 

    return res.status(200).json(
        new ApiResponse(200, {filteredUsers}, "")
    )
})

const getMessages = asyncHandler(async (req, res) => {
    const myId = req.user._id;
    const personToChatId = req.params;

    const messages = await Message.find({
        $or: [
            {senderId: myId, receiverId: personToChatId},
            {senderId: personToChatId, receiverId: myId}
        ]
    })

    return res.status(200).json(
        new ApiResponse(200, messages, "")
    )
})

export {
     getAllUsers,
     getMessages,
}