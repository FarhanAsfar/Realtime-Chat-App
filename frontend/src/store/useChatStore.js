import {create} from "zustand"
import toast from "react-hot-toast"
import  axiosInstance  from "../lib/axios"


const useChatStore = create((set) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessageLoading: false,

    getUsers: async() => {
        set({isUserLoading: true});

        try {
            const res = await axiosInstance.get("/message/users");
            console.log(res.data);
            set({users: res.data.data.filteredUsers});
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

    // sendMessage: async (messageData) => {
    //     const {selectedUser, messages} = get();

    //     try {
    //         const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData);

    //         set({messages: [...messages, res.data]});
    //     } catch (error) {
    //         toast.error(error.response.data.message);
    //     }
    // },

    setSelectedUser: (selectedUser) => {
         set({selectedUser})
    }

}))

export default useChatStore;