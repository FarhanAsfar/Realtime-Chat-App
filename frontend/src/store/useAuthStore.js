import {create} from "zustand"
import axiosInstance from "../lib/axios";

const useAuthStore = create((set) => ({
    authUser: null,

    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,

    checkAuth: async() => {
        try {
            const res = await axiosInstance.get("/auth/check");

            set({authUser: res.data})
        } catch (error) {
            console.log("Check auth error", error);
            set({authUser: null}); 
        } finally{
            set({authUser: false});  
        }
    }
}))

export default useAuthStore;