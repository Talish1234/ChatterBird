import { IoCall, IoCallSharp } from "react-icons/io5";
import socket from "../../utils/socket";

import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiRequest from "../../utils/apiRequest";

;

interface IncomingCallProps {
  profilePicture: string;
  name: string;
  text: string;
  userId: string;
  callId: string;
}

function NotificationsCallCard({
  profilePicture,
  name,
  text,
  userId,
  callId
}: IncomingCallProps) {
  const redirect = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const callType = queryParams.get("call-type");
  
  const onEndCall = async () => {
    const log = await apiRequest.put(`/call/${callId}`, {
      type:'rejected'
    });
    
    socket.emit('call-ended',{to:userId});
  }
  
  const onAcceptCall = async () => {

    if(callType == 'incoming'){      
     toast.warning(`You're already in a call`)
     socket.emit('call-ended',{to:userId});
    }
    else {
      await apiRequest.put(`/call/${callId}`, {
      type:'incoming'
    })
    redirect(`/user/call/${userId}?call-type=incoming`,{state:{ remoteUser: { profilePicture, name, text } }});
    }
  }

  return (
    <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900">
      <img
        src={profilePicture}
        alt={name}
        className="w-16 h-16 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700"
      />

      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-lg text-gray-900 dark:text-white">{name}</h2>
        <p className="text-sm text-green-800 dark:text-green-700">{text}</p>

        <div className="flex gap-3 mt-2">
          <button onClick={onAcceptCall}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl shadow-md transition"
          >
            <IoCall size={24}/> 
          </button>

          <button
            onClick={onEndCall}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl shadow-md transition"
          >
            <IoCallSharp size={24}/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotificationsCallCard;