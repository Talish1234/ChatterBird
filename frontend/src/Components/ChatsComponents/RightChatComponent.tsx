import { useSelector } from "react-redux";
import type { RootState } from "../../Redux/Store";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import ChatWindow from "./ChatWindow";
import type { UserInfo } from "../../Interfaces/interface";
import apiRequest from "../../utils/apiRequest";

const RightChatComponent = ({ className }: { className?: string }) => {
  const selectedUser = useSelector((state: RootState) => state.selectedUser.value);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedUser) {
      setUser(null);
      return;
    }

    const fetchUser = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const foundUser = await apiRequest.get(`/user/${selectedUser}`);
        setUser(foundUser.data.user);
      } catch (err) {
        console.error(err);
        setError("Failed to load user. Please try again.");
      }
      setIsLoading(false);
    };

    fetchUser();
  }, [selectedUser]);

  return (
    <div className={`w-full h-full dark:bg-gray-800 ${className}`}>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <div className="flex items-center justify-center h-full text-red-500">
          {error}
        </div>
      ) : user ? (
        <ChatWindow user={user} />
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
          Select a user to start chatting
        </div>
      )}
    </div>
  );
};

export default RightChatComponent;
