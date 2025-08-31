import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./Redux/Store";
import { useEffect } from "react";
import socket from "./utils/socket";
import { pushNotification } from "./Redux/notificationStackSlice";
import { toast } from "react-toastify";
import NotificationsCard from "./Components/Cards/NotificationCard";

const UserLayout = () => {
  const selectedUser = useSelector(
    (state: RootState) => state.selectedUser.value
  );
  const authUser = useSelector((state: RootState) => state.authUser.user);
  const setting = useSelector((state: RootState) => state.setting.setting);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!authUser?._id) return;

    socket.emit("join", authUser._id);
  }, [authUser?._id]);

  useEffect(() => {
    if (!authUser?._id) return;
    
    const handleNotification = (notification: any) => {
      if (notification.sender.message.userId !== selectedUser) {
        dispatch(
          pushNotification({
            userId: notification.sender.message.userId,
            count: 1,
          })
        );
        if (setting.notification)
          toast.info(
            <NotificationsCard
              userId={notification.sender.message.userId}
              profilePicture={notification.sender.profilePicture}
              name={notification.sender.name}
              text={notification.sender.message.text}
            />
          );
      }
    };

    socket.on("receive-notification", handleNotification);

    return () => {
      socket.off("receive-notification", handleNotification);
    };
  }, [selectedUser, authUser?._id, setting.notification]);

  return (
    <div className="flex h-screen">
      <Navbar className="hidden md:flex" />
      <Outlet />
      {!selectedUser && (
        <Navbar className="md:hidden fixed bottom-0 left-0 right-0" />
      )}
    </div>
  );
};

export default UserLayout;
