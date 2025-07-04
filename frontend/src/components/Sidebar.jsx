import { useEffect } from "react";
import useChatStore from "../store/useChatStore";
import { Users } from "lucide-react";

const Sidebar = () => {
    const {getUsers, users, selectedUser, setSelectedUser, isUserLoading} = useChatStore();
    
    useEffect(() => {
        getUsers();
    }, [getUsers])

    if(isUserLoading){
        return (
            <div>Loading...</div>
        )
    }
    
    return (
        <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
            <div className="border-b border-base-300 w-full p-5">
                <div className="flex items-center gap-2">
                    <Users className="size-6" />
                    <span className="font-medium hidden lg:block">Contacts</span>
                </div>
            </div>

            <div className="overflow-y-auto w-full py-3">
                {users.map((user) => (
                    <button 
                        key={user._id}
                        onClick={() => setSelectedUser(user)}
                        className={`
                            w-full p-3 flex items-center gap-3
                            hover:bg-base-300 transition-colors
                            ${selectedUser?._id === user._id ? "bg-base-300ring-1 ring-base-300" : ""}
                        `}
                    >   
                    {/* {console.log(users.fullName)} */}
                        <div className="relative mx-auto lg:mx-0">
                            <img src={user.profilePic || "/vite.svg"} alt={user.fullName} className="size-12 object-cover rounded-full" />
                        </div>

                        {/* Show user name on large screen */}
                        <div className="hidden lg:block text-left min-w-0">
                            <div className="font-medium truncate">
                                {user.fullName}
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </aside>
    )
}

export default Sidebar;