import { useDispatch, useSelector } from "react-redux";
import LeftChatComponent from "../Components/ChatsComponents/LeftChatComponent";
import RightChatComponent from "../Components/ChatsComponents/RightChatComponent";
import Navbar from "../Components/Navbar";
import type { RootState } from "../Redux/Store";
import Loading from "../Components/Loading/Loading";
import { useEffect } from "react";
import { clearSelectedUser } from "../Redux/selectedUserSlices";
import socket from "../utils/socket";
import { toast } from "react-toastify";
import NotificationCard from "../Components/Cards/NotificationCard";

const ChatsPage = () => {
  const authUser = useSelector((state: RootState) => state.authUser.user);
  const selectedUser = useSelector(
    (state: RootState) => state.selectedUser.value
  );
  const dispatch = useDispatch();
  useEffect(() => {
  if (!authUser?._id) return;

  socket.emit("join", authUser._id);

  const handleNotification = (notification: any) => {
    if (notification.sender.message.userId !== selectedUser) {
      toast.info(
        <NotificationCard
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
}, [selectedUser, authUser?._id]);
  return (
    <div className="flex md:flex-row flex-col h-screen">
      <Navbar className="hidden md:flex" />
      <div className="flex w-full h-full">
        <LeftChatComponent
          className={`lg:basis-1/3 md:basis-1/2 ${
            selectedUser ? "hidden md:flex" : "flex"
          } `}
        />
        {selectedUser ? (
          <RightChatComponent className={`lg:basis-2/3 md:basis-1/2`} />
        ) : (
          <Loading
            className={`lg:basis-2/3 md:basis-1/2 hidden md:flex`}
            animate={false}
          />
        )}
      </div>
      {!selectedUser && (
        <Navbar className="md:hidden fixed bottom-0 left-0 right-0" />
      )}
    </div>
  );
};

export default ChatsPage;
