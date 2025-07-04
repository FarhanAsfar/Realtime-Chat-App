import {create} from "zustand"
import toast from "react-hot-toast"
import {axiosInstance} from "../lib/axios"


const useChatStore = craete((set) => ({
    message: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessageLoading: false,

    getUsers: async() => {
        set({isUserLoading: true});

        try {
            const res = await axiosInstance.get("/message/users");

            set({users: res.data});
        } catch (error) {
            toast.error(error.response.data.message);
        } finally{
            set({isUserLoading: false})
        }
    },

    getMessages: async(userId) => {
        set({isMessageLoading: true});

        try {
            const res = await axiosInstance.get(`/message/${userId}`);
            set({message: res.data})
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({isMessageLoading: false});
        }
    },

    
}))

export default useChatStore;