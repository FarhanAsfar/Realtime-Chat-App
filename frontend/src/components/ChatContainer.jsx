import { useEffect } from "react";
import useChatStore from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";

const ChatContainer = () => {
    const {messages, getMessages, isMessageLoading, selectedUser} = useChatStore();

    useEffect(() => {
        getMessages(selectedUser._id);
    }, [selectedUser._id, getMessages])
    
    if(isMessageLoading){
        return(
            <div>Loading Messages...</div>
        )
    }
    
    return (
        <div>
            <ChatHeader />
            <p>messages</p>
            <MessageInput />
        </div>
    )
}

export default ChatContainer;