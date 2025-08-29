import { useDispatch } from "react-redux";
import type { notificationStack, UserInfo } from "../../Interfaces/interface";
import { setSelectedUser } from "../../Redux/selectedUserSlices";
import { format } from "timeago.js";
import { popNotification } from "../../Redux/notificationStackSlice";

const UserCard = ({
  user,
  notifications,
}: {
  user: UserInfo;
  notifications?: notificationStack;
}) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setSelectedUser(user._id));
    dispatch(popNotification(user._id));
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      className="flex w-full justify-between items-center cursor-pointer p-3 rounded-xl 
                 hover:bg-gray-100 dark:hover:bg-teal-800 transition"
    >
      <div className="flex items-center gap-3">
        <img
          src={user.profilePicture}
          alt={user.name}
          className="w-14 h-14 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700"
        />
        <div>
          <h2 className="font-semibold text-lg">{user.name}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {user.bio || "No bio available"}
          </p>
        </div>
      </div>

      {notifications && notifications.count > 0 && (
        <div className="flex flex-col items-end gap-1">
          <span className="text-gray-500 text-xs">
            {format(
              new Date(
                notifications?.createdAt || "2025-08-29T04:56:39.123Z"
              ) || new Date()
            )}
          </span>
          <span className="flex items-center justify-center h-5 w-5 rounded-full bg-red-600 text-white text-xs font-semibold shadow">
            {notifications.count}
          </span>
        </div>
      )}
    </div>
  );
};

export default UserCard;
