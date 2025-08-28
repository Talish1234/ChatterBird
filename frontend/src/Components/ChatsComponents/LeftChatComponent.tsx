import { FaEarlybirds } from "react-icons/fa";
import SearchComponent from "../SearchComponent";
import type { UserInfo } from "../../Interfaces/interface";
import { useEffect, useState } from "react";
import UserCard from "../Cards/UserCard";
import { useSelector } from "react-redux";
import type { RootState } from "../../Redux/Store";
import apiRequest from "../../utils/apiRequest";
import LoadingSpinner from "../Loading/LoadingSpinner";

const LeftChatComponent = ({ className }: { className?: string }) => {
  const authUser = useSelector((state: RootState) => state.authUser.user);
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [isLoading,setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    try{
      setIsLoading(true);
      const fetchUsers = async () => {
      const filteredUsers = await apiRequest.get("/user");
      setUsers(filteredUsers.data.users.filter((user: UserInfo) => user._id !== authUser._id));
      setIsLoading(false);
    };
    fetchUsers();
    }catch(error){
      console.error(error);
    }
  }, []);
  return (
    <div
      className={`flex-col justify-between w-full h-full bg-black px-2 ${className}`}
    >
      <div className="flex justify-between items-center py-5 pb-3 px-7">
        <SearchComponent />
        <FaEarlybirds size={48} color="white" />
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src={authUser.profilePicture}
            alt="profile pic"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="max-h-[70%] bg-white overflow-y-auto w-full rounded-t-4xl pt-7 md:pb-4 pb-28 px-12 flex flex-col items-center gap-4 dark:bg-teal-950 dark:text-gray-300">
        <div className="bg-gray-300 w-16 h-2 rounded-2xl">&nbsp;</div>
        {isLoading ? <LoadingSpinner /> : (
          users.length > 0 ? (
            users.map((user) => <UserCard key={user._id} user={user} />)
          ) : (
            <div className="text-gray-500 py-8">No users found</div>
          )
        )}
      </div>
    </div>
  );
};

export default LeftChatComponent;
