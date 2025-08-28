import { useDispatch, useSelector } from "react-redux";
import LeftChatComponent from "../Components/ChatsComponents/LeftChatComponent";
import RightChatComponent from "../Components/ChatsComponents/RightChatComponent";
import Navbar from "../Components/Navbar";
import type { RootState } from "../Redux/Store";
import Loading from "../Components/Loading/Loading";
import { useEffect } from "react";
import { clearSelectedUser } from "../Redux/selectedUserSlices";

const ChatsPage = () => {
  const selectedUser = useSelector((state:RootState) => state.selectedUser.value);
  const dispatch = useDispatch();
  useEffect( () => {
    return () => {dispatch(clearSelectedUser())};
  }, []);
  return (
    <div className="flex md:flex-row flex-col h-screen">
        <Navbar className="hidden md:flex" />
      <div className="flex w-full h-full">
        <LeftChatComponent className={`lg:basis-1/3 md:basis-1/2 ${selectedUser?"hidden md:flex":"flex"} `} />
        {selectedUser ? <RightChatComponent className={`lg:basis-2/3 md:basis-1/2`} /> : <Loading
          className={`lg:basis-2/3 md:basis-1/2 hidden md:flex`}
          animate={false}
        />}
      </div>
      {!selectedUser && <Navbar className="md:hidden fixed bottom-0 left-0 right-0" />}
    </div>
  );
};

export default ChatsPage;
