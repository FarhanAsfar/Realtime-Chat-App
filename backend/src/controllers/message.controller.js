import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import { cloudinary } from "../utils/cloudinary.js";
import { getReceiverSocketId, io } from "../utils/socket.js";


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
    const personToChatId = req.params.id;

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


const sendMessages = asyncHandler(async (req, res) => {
    const {text, image} = req.body;
    const senderId = req.user._id;
    const receiverId = req.params.id;

    let imageURL;

    if(image){
        const cloudinaryResponse = await cloudinary.uploader.upload(image);
        imageURL = cloudinaryResponse.secure_url;
    }

    const newMessage = await Message.create({
        senderId,
        receiverId,
        text,
        image: imageURL,
    });

    //socket.io: send the message in real time to the receiver
    const receiverSocketId = getReceiverSocketId(receiverId);

    if(receiverSocketId){
        io.to(receiverSocketId).emit("newMessage", newMessage);
    }


    return res.status(200).json(
        new ApiResponse(200, newMessage, "")
    )
})

export {
     getAllUsers,
     getMessages,
     sendMessages,
}