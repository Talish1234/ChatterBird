import { useDispatch, useSelector } from "react-redux";
import type { message, UserInfo } from "../../Interfaces/interface";
import RedirectArrow from "../RedirectArrow";
import { format } from "timeago.js";
import { setSelectedUser } from "../../Redux/selectedUserSlices";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import InputField from "../InputFieldComponent/InputField";
import MotionComponent from "../MotionComponent";
import apiRequest from "../../utils/apiRequest";
import type { RootState } from "../../Redux/Store";
import socket from "../../utils/socket";
import { AnimatePresence, motion } from "framer-motion";

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
  const [isOnline,setIsOnline] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const authUser = useSelector((state: RootState) => state.authUser.user);
  
  useEffect(() => {

    socket.on('online', (data) => {
      if(data === user._id)
        setIsOnline(true);
    });
    
    socket.emit('isOnline', user._id);
    
    socket.on('offline', (data) => {
        if(data === user._id)
        setIsOnline(false);
    })

    return () => {
      socket.off('online');
      socket.off('offline');
    };
  }, [socket]);

  useEffect(() => {
    socket.on("receive-message", (data) => {
      if (data.userId === user._id) {
        setMessages((prev) => [...prev, data]);
      }
    });
    
    return () => {
      socket.off("receive-message");
    };
  }, [authUser, user._id]);

  useEffect(() => {
    const fetchChat = async () => {
      setIsLoading(true);
      try {
        const response = await apiRequest.post(`/chat/open`, {
          reciverId: user._id,
        });
        if (response?.data) {
          setChatId(response.data.chat._id);
          setMessages(response.data.messages ?? []);
        }
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };
    fetchChat();
  }, [user._id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!chatId || !newMessage.trim()) return;
    try {
      const response = await apiRequest.post("/message/createMessage", {
        chatId,
        text: newMessage.trim(),
      });

      if (response?.data) {
        socket.emit("send-message", {
          receiverId: user._id,
          message: response.data.message,
          name: authUser?.name,
          profilePicture: authUser?.profilePicture,
        });

        setMessages((prev) => [...prev, response.data.message]);
      }
    } catch (error) {
      console.error(error);
    }
    setNewMessage("");
  };

  return (
    <div
      className={`dark:text-white ${className} flex w-full flex-col justify-between h-full px-4 pb-16 md:pb-3`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 py-3 border-b border-gray-200 dark:border-gray-700">
        <RedirectArrow clickHandler={() => dispatch(setSelectedUser(null))} />
        <img
          src={user.profilePicture}
          alt={user.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h2 className="text-md font-semibold">{user.name}</h2><AnimatePresence>
  {isOnline && (
    <motion.p
      className="text-xs text-gray-500 dark:text-green-600"
      initial={{ opacity: 0, y: -5 }} // Initial state (invisible, slightly moved up)
      animate={{ opacity: 1, y: 0 }} // Final state (fully visible)
      exit={{ opacity: 0, y: -5 }} // Exit state (fades out and moves up)
      transition={{ duration: 0.5 }} // How long the transition takes
    >
      Active now
    </motion.p>
  )}
</AnimatePresence>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto py-3 space-y-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600"
      >
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <LoadingSpinner />
          </div>
        ) : (
          messages.map((msg, index) => {
            const isOwn = msg.userId === authUser?._id;
            return (
              <div
                key={index}
                className={`flex w-full ${
                  isOwn ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-lg max-w-xs shadow-sm transition hover:scale-[1.01] ${
                    isOwn
                      ? "bg-teal-700 text-white rounded-tr-none"
                      : "bg-gray-200 dark:bg-gray-600 text-black dark:text-white rounded-tl-none"
                  }`}
                >
                  <span className="block">{msg.text}</span>
                  <span
                    className={`text-[10px] ${
                      isOwn ? "text-gray-300" : "text-gray-500 dark:text-gray-400"
                    } font-light block mt-0.5`}
                  >
                    {format(msg.createdAt)}
                  </span>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="fixed bottom-0 left-0 right-0 flex w-full items-center gap-2 p-2 bg-white dark:bg-gray-800 md:sticky md:bottom-0 border-t border-gray-200 dark:border-gray-700">
        <InputField
          value={newMessage}
          onChangeInputField={(e) => setNewMessage(e.target.value)}
          type="text"
          placeholder="Type a message..."
          className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-2 focus:ring-2 focus:ring-teal-600 outline-none"
        />

        <MotionComponent
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: newMessage ? 1 : 0, scale: newMessage ? 1 : 0.5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="p-3 bg-teal-700 hover:bg-teal-800 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full shadow-md transition"
          >
            <IoSend size={18} />
          </button>
        </MotionComponent>
      </div>
    </div>
  );
};

export default ChatWindow;
