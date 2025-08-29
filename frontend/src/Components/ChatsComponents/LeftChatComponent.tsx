// LeftChatComponent.tsx
import { FaEarlybirds } from "react-icons/fa";
import SearchComponent from "../SearchComponent";
import type { notificationStack, UserInfo } from "../../Interfaces/interface";
import { useEffect, useState } from "react";
import UserCard from "../Cards/UserCard";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../Redux/Store";
import apiRequest from "../../utils/apiRequest";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { pushNotification } from "../../Redux/notificationStackSlice";

const LeftChatComponent = ({ className }: { className?: string }) => {
  const dispatch = useDispatch();
  const authUser: UserInfo | null = useSelector((state: RootState) => state.authUser.user);
  const notifications: notificationStack[] = useSelector((state: RootState) => state.notificationStack);

  const [users, setUsers] = useState<UserInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await apiRequest.get("/user");
        const fetchedUsers: UserInfo[] = response.data.users;

        // Filter out current user
        const filtered = fetchedUsers.filter((u) => u._id !== authUser?._id);
        setUsers(filtered);

        // Initialize notification stack if not present
        filtered.forEach((user) => {
          if (!notifications.some((n) => n.userId === user._id)) {
            dispatch(pushNotification({ userId: user._id, count: 0 }));
          }
        });
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [authUser?._id, dispatch, notifications]);

  return (
    <div className={`flex-col justify-between w-full h-full bg-black px-2 ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center py-5 pb-3 px-7 gap-2">
        <SearchComponent />
        <FaEarlybirds size={42} className="text-white" />
        <div className="w-12 h-12 min-w-8 min-h-8 rounded-full overflow-hidden ring-2 ring-white/20">
          <img
            src={authUser?.profilePicture}
            alt="profile pic"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Users */}
      <div className="max-h-[70%] bg-white overflow-y-auto w-full rounded-t-4xl pt-7 md:pb-4 pb-28 px-6 flex flex-col items-center gap-4 dark:bg-teal-950 dark:text-gray-300">
        <div className="bg-gray-300 w-16 h-2 rounded-2xl" />
        {isLoading ? (
          <LoadingSpinner />
        ) : users.length > 0 ? (
          users.map((user) => {
            const userNotifications = notifications.find((n) => n.userId === user._id);
            return <UserCard key={user._id} user={user} notifications={userNotifications} />;
          })
        ) : (
          <div className="text-gray-500 py-8">No users found</div>
        )}
      </div>
    </div>
  );
};

export default LeftChatComponent;
