import { IoCall, IoCallSharp } from "react-icons/io5";
import socket from "../../utils/socket";

import { useNavigate, Link } from "react-router-dom";

;

interface IncomingCallProps {
  profilePicture: string;
  name: string;
  text: string;
  userId: string;
}

function NotificationsCallCard({
  profilePicture,
  name,
  text,
  userId,
}: IncomingCallProps) {
  const onEndCall = () => {
    socket.emit('call-ended',{to:userId});
  }
  return (
    <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900">
      {/* Profile */}
      <img
        src={profilePicture}
        alt={name}
        className="w-16 h-16 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700"
      />

      {/* Info + Actions */}
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-lg text-gray-900 dark:text-white">{name}</h2>
        <p className="text-sm text-green-800 dark:text-green-700">{text}</p>

        {/* Buttons */}
        <div className="flex gap-3 mt-2">
          <Link
            to={`/user/call/${userId}?call-type=incoming`}
            state={{ remoteUser: { profilePicture, name, text } }}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl shadow-md transition"
          >
            <IoCall size={24}/> 
          </Link>

          <button
            onClick={onEndCall}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl shadow-md transition"
          >
            <IoCallSharp size={24}/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotificationsCallCard;