import { useDispatch, useSelector } from "react-redux";
import type { message, UserInfo } from "../../Interfaces/interface";
import RedirectArrow from "../RedirectArrow";
import { clearSelectedUser, setSelectedUser } from "../../Redux/selectedUserSlices";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import InputField from "../InputFieldComponent/InputField";
import MotionComponent from "../MotionComponent";
import apiRequest from "../../utils/apiRequest";
import type { RootState } from "../../Redux/Store";
import socket from "../../utils/socket";

const ChatWindow = ({
  user,
  className,
}: {
  user: UserInfo;
  className?: string;
}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [chatId, setChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const authUser = useSelector((state: RootState) => state.authUser.user);

  useEffect(()=>{ 
    
    socket.on('receive-message', (data) => {
        if(data.userId === user._id)
        setMessages((prevMessages) => [...prevMessages, data]);
    });
    
    return () => {
      socket.off('receive-message');
    };
  },[authUser]);

  const handleSendMessage = async () => {
    if (!chatId || !newMessage.trim()) return;
    try {
      const response = await apiRequest.post('/message/createMessage',{
        chatId: chatId,
        text: newMessage.trim()
      });
      if(response && response.data){
        socket.emit('send-message', { receiverId: user._id, message: response.data.message, name: authUser?.name, profilePicture: authUser?.profilePicture });
        setMessages((prevMessages) => [...prevMessages, response.data.message]);
      }
    } catch (error) {
      console.error(error);
    }
    setNewMessage("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const fetchChat = async () => {
      setIsLoading(true);
      try {
        const response = await apiRequest.post(`/chat/open`, {
          reciverId: user._id,
        });
        if(response && response.data){
        setChatId(response.data.chat._id);
        setMessages(response.data.messages);
        console.log('chat', response.data);
        }
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    }
    fetchChat();
  }, []);

  return (
    <div
      className={`dark:text-white ${className} flex w-full flex-col justify-between h-full px-5 pb-14 md:pb-2`}
    >
      <RedirectArrow clickHandler={() => dispatch(setSelectedUser(null))} />

      <div className="flex items-center px-18 py-3 gap-2">
        <img
          src={user.profilePicture}
          alt={user.name}
          className="w-12 h-12 rounded-full"
        />
        <div className="flex flex-col justify-center">
          <h2 className="text-md font-semibold">{user.name}</h2>
          <p className="text-xs text-gray-500">{"Active now"}</p>
        </div>
      </div>

      <div className="overflow-y-auto h-full">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          messages &&
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex w-full mb-2 ${
                msg.userId === authUser?._id ? "justify-end" : "justify-start"
              }`}
            >
              <span
                className={`font-semibold px-3 py-2 rounded-lg max-w-xs ${
                  msg.userId === authUser?._id
                    ? "bg-teal-700 text-white rounded-tr-none"
                    : "bg-gray-300 text-black rounded-tl-none"
                }`}
              >
                {msg.text}
              </span>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="fixed bottom-0 left-0 right-0 flex w-full items-center justify-between gap-2 p-2 bg-inherit md:sticky md:bottom-0">
        {/* Input field */}
        <InputField
          value={newMessage}
          onChangeInputField={(e) => setNewMessage(e.target.value)}
          type="text"
          placeholder="Type a message..."
          className="flex-1 bg-gray-100 dark:bg-gray-600 rounded-lg p-2"
        />

        {/* Animated button */}
     
          {newMessage && ( // 👈 only show button if there's text
            <MotionComponent
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: "spring" }}
            >
              <button
                onClick={handleSendMessage}
                className="p-3 bg-teal-900 text-white rounded-full"
              >
                <IoSend size={20} />
              </button>
            </MotionComponent>
          )}
    
      </div>
    </div>
  );
};

export default ChatWindow;
