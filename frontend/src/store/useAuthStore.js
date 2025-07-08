import {create} from "zustand"
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

const useAuthStore = create((set, get) => ({
    authUser: null,

    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,
    
    checkAuth: async() => {
        try {
            const res = await axiosInstance.get("/auth/check");

            set({authUser: res.data})
            //Connect to socketio when user is authenticated
            get().connectSocket();
        } catch (error) {
            console.log("Check auth error", error);
            set({authUser: null}); 
        } finally{
            set({isCheckingAuth: false});  
        }
    },

    signup: async(data) => {
        set({isSigningUp: true});

        try {
            const res = await axiosInstance.post("/auth/signup", data);
            
            set({authUser: res.data});

            toast.success("Account created successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally{
            set({isSigningUp: false});
        }
    },

    login: async(data) => {
        set({isLoggingIn: true});

        try {
            const res = await axiosInstance.post("auth/signin", data);

            set({authUser: res.data});

            toast.success("Logged in successfully");
            //connect socket when user logs in successfully
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({isLoggingIn: false})
        }
    },

    signout: async () => {
        try {
            await axiosInstance.post("/auth/signout");
            set({ authUser: null });

            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    updateProfile: async(data) => {
        set({isUpdatingProfile: true});

        try {
            const res = await axiosInstance.put("/user/update-profile", data);
            set({authUser: res.data});

            toast.success("Profile picture updated successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({isUpdatingProfile: false});
        }
    },

    connectSocket: () => {

    }

    
}))

export default useAuthStore;