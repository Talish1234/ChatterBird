import { useSelector } from "react-redux";
import LeftChatComponent from "../Components/ChatsComponents/LeftChatComponent";
import RightChatComponent from "../Components/ChatsComponents/RightChatComponent";
import type { RootState } from "../Redux/Store";
import Loading from "../Components/Loading/Loading";

const ChatsPage = () => {
  const selectedUser = useSelector(
    (state: RootState) => state.selectedUser.value
  );
  return (
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
  );
};

export default ChatsPage;
