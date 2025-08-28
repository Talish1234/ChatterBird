import { useSelector } from "react-redux";
import type { RootState } from "../../Redux/Store";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import ChatWindow from "./ChatWindow";
import type { UserInfo } from "../../Interfaces/interface";
import apiRequest from "../../utils/apiRequest";

const RightChatComponent = ({className}:{className?:string}) => {
  const selectedUser = useSelector((state:RootState) => state.selectedUser.value);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try{
        const foundUser = await apiRequest.get(`/user/${selectedUser}`);
        setUser(foundUser.data.user);
      }catch(error){
        console.error(error);
      }
      setIsLoading(false);
    }
    fetchUsers();
  }, [selectedUser]);

 
  return (
    <div className={`w-full h-full dark:bg-gray-800 ${className}`}>
      {isLoading ? <Loading /> : user && <ChatWindow user={user} />}
    </div>
  );
};

export default RightChatComponent;
