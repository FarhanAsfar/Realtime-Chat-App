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
            const res = await axiosInstance.get("/messages/users");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally{
            set({isUserLoading: false})
        }
    }
}))