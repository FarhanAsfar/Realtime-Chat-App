import {Server} from "socket.io"
import http from "http"
import { app } from "../app.js";


const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        credentials: true,
    }
})

//get receiver socket id when userId is passed
export function getReceiverSocketId(userId){
    return userSocketMap[userId];
}

//Store online users
const userSocketMap = {};   //{userId: socketId}

io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    const userId = socket.handshake.query.userId;

    if(userId){
        userSocketMap[userId] = socket.id;
    }

    io.emit("getOnLineUsers", Object.keys(userSocketMap)); //send events to all the connected clients

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
        
        delete userSocketMap[userId];
        io.emit("getOnLineUsers", Object.keys(userSocketMap));
    });
})

export {io, server}