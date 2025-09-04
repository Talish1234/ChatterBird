import { useCallback, useEffect, useState } from "react";
import socket from "../utils/socket";
import { useSelector } from "react-redux";
import peer from "../utils/peer";
import type { RootState } from "../Redux/Store";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { MdCallEnd } from "react-icons/md";
import { CiVideoOff, CiVideoOn } from "react-icons/ci";
import { IoMicOffOutline, IoMicOutline } from "react-icons/io5";
import apiRequest from "../utils/apiRequest";

const CallPage = () => {
  const redirect = useNavigate();
  const location = useLocation();
  const { remoteUserId } = useParams();
  const { remoteUser } = location.state || {};
  const [searchParams] = useSearchParams();
  const callType = searchParams.get("call-type");
  const authUser = useSelector((state: RootState) => state.authUser.user);
  const [isCameraOn,setIsCameraOn] = useState<boolean>(true);
  const [isMicOn,setIsMicOn] = useState<boolean>(true);
  const [authStream, setAuthStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [remoteSocketId, setRemoteSocketId] = useState<string | null>(null);

  // Call initiation (caller side)
  const handleCall = useCallback(async () => {
    try {
      const response = await apiRequest.post("/call/create", {
        receiverId: remoteUserId,
      });

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      setAuthStream(stream);

      // Add tracks to fresh peer
      stream.getTracks().forEach((track) => {
        peer.peer.addTrack(track, stream);
      });

      socket.emit("calling", {
        to: remoteUserId,
        from: authUser,
        callId: response.data.log._id,
      });
    } catch (error) {
      redirect("user/chats");
    }
  }, [remoteUserId]);

  const handleIncommingCall = useCallback(
    async ({
      from,
      offer,
    }: {
      from: string;
      offer: RTCSessionDescriptionInit;
    }) => {
      setRemoteSocketId(from);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setAuthStream(stream);

      stream.getTracks().forEach((track) => {
        peer.peer.addTrack(track, stream);
      });

      const ans = await peer.getAnswer(offer);
      socket.emit("call-accepted", { to: from, ans });
    },
    []
  );

  const handleAcceptedCall = useCallback(
    async ({ from, ans }: { from: string; ans: RTCSessionDescriptionInit }) => {
      await peer.setRemoteDescription(ans);
    },
    []
  );

  useEffect(() => {
    peer.peer.addEventListener("track", (ev) => {
      const [stream] = ev.streams;
      setRemoteStream(stream);
    });
  }, []);

  useEffect(() => {
    peer.peer.onicecandidate = (event) => {
      if (event.candidate && remoteSocketId) {
        socket.emit("ice-candidate", {
          to: remoteSocketId,
          candidate: event.candidate,
        });
      }
    };

    socket.on("ice-candidate", async ({ candidate }) => {
      try {
        await peer.peer.addIceCandidate(candidate);
      } catch (err) {}
    });

    return () => {
      socket.off("ice-candidate");
    };
  }, [remoteSocketId]);

  const toggleCamera = useCallback(() => {
    if (authStream) {
      const videoTrack = authStream.getVideoTracks()[0];
      if (videoTrack) {
        setIsCameraOn((prev => !prev));
        videoTrack.enabled = !videoTrack.enabled;
      }
    }
  }, [authStream]);

  const toggleMic = useCallback(() => {
    if (authStream) {
      const audioTrack = authStream.getAudioTracks()[0];
      if (audioTrack) {
        setIsMicOn( prev => !prev);
        audioTrack.enabled = !audioTrack.enabled;
      }
    }
  }, [authStream]);

  const endCall = useCallback(() => {
    socket.emit("call-ended", { to: remoteUserId });

    if (authStream) {
      authStream.getTracks().forEach((track) => track.stop());
      setAuthStream(null);
    }
    setRemoteStream(null);

    peer.peer.close();

    // fresh peer
    peer.peer = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        {
          urls: "turn:numb.viagenie.ca",
          credential: "muazkh",
          username: "webrtc@live.com",
        },
        {
          urls: "turn:192.158.29.39:3478?transport=udp",
          credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
          username: "28224511:1379330808",
        },
        {
          urls: "turn:192.158.29.39:3478?transport=tcp",
          credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
          username: "28224511:1379330808",
        },
        {
          urls: "turn:turn.bistri.com:80",
          credential: "homeo",
          username: "homeo",
        },
        {
          urls: "turn:turn.anyfirewall.com:443?transport=tcp",
          credential: "webrtc",
          username: "webrtc",
        },
      ],
    });

    peer.peer.ontrack = (ev) => {
      const [stream] = ev.streams;
      setRemoteStream(stream);
    };
    peer.peer.onicecandidate = (event) => {
      if (event.candidate && remoteSocketId) {
        socket.emit("ice-candidate", {
          to: remoteSocketId,
          candidate: event.candidate,
        });
      }
    };

    setRemoteSocketId(null);
    redirect("/user/chats");
  }, [authStream, remoteSocketId]);

  // Handle remote end call
  useEffect(() => {
    const handleCallEnded = () => {
      if (authStream) {
        authStream.getTracks().forEach((track) => track.stop());
        setAuthStream(null);
      }

      setRemoteStream(null);

      peer.peer.close();

      peer.peer = new RTCPeerConnection({
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          {
            urls: "turn:numb.viagenie.ca",
            credential: "muazkh",
            username: "webrtc@live.com",
          },
          {
            urls: "turn:192.158.29.39:3478?transport=udp",
            credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
            username: "28224511:1379330808",
          },
          {
            urls: "turn:192.158.29.39:3478?transport=tcp",
            credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
            username: "28224511:1379330808",
          },
          {
            urls: "turn:turn.bistri.com:80",
            credential: "homeo",
            username: "homeo",
          },
          {
            urls: "turn:turn.anyfirewall.com:443?transport=tcp",
            credential: "webrtc",
            username: "webrtc",
          },
        ],
      });

      peer.peer.ontrack = (ev) => {
        const [stream] = ev.streams;
        setRemoteStream(stream);
      };

      peer.peer.onicecandidate = (event) => {
        if (event.candidate && remoteSocketId) {
          socket.emit("ice-candidate", {
            to: remoteSocketId,
            candidate: event.candidate,
          });
        }
      };

      setRemoteSocketId(null);
      redirect("/user/chats");
    };

    socket.on("call-ended", handleCallEnded);
    return () => {
      socket.off("call-ended", handleCallEnded);
    };
  }, [authStream, remoteSocketId]);
  // test logic

  useEffect(() => {
    if (callType != "incoming") {
      handleCall();
    } else {
      socket.emit("start-connecting", { to: remoteUserId });
    }
  }, []);

  const handleStartConnection = async ({ from }: { from: string }) => {
    const offer = await peer.getOffer();
    socket.emit("call-connected", { to: from, offer });
  };
  useEffect(() => {
    socket.on("start-connecting", handleStartConnection);
    socket.on("incomming-call", handleIncommingCall);
    socket.on("call-accepted", handleAcceptedCall);

    return () => {
      socket.off("incomming-call", handleIncommingCall);
      socket.off("call-accepted", handleAcceptedCall);
      socket.off("start-connecting", handleStartConnection);
    };
  }, [handleIncommingCall, handleAcceptedCall]);

  if (!remoteUserId)
    return (
      <div className="bg-white dark:bg-gray-900 w-full h-screen flex items-center justify-center text-3xl text-gray-900 dark:text-white">
        User not found!
      </div>
    );

  const hasRemoteVideo =
    remoteStream &&
    remoteStream
      .getVideoTracks()
      .some((track) => track.readyState === "live" && track.enabled);

  return (
    <div className="w-[100vw] min-h-screen flex items-center dark:bg-gray-800 bg-white transition-colors duration-300 pb-16 md:pb-0">
      {!hasRemoteVideo && (
        <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40">
          <img
            src={remoteUser?.profilePicture}
            alt="Remote User"
            className="w-36 h-36 md:h-42 md:w-42 rounded-full shadow-lg object-cover"
          />
        </div>
      )}

      <div className="w-full h-full relative bg-transparent">
        {authStream && (
          <video
            autoPlay
            playsInline
            muted
            className="w-20 aspect-[9/16]  md:aspect-video md:w-60 rounded-lg border border-amber-50 object-cover absolute bottom-32 right-2 md:bottom-8 md:right-8"
            ref={(videoEl) => {
              if (videoEl && authStream) {
                videoEl.srcObject = authStream;
              }
            }}
          />
        )}

        {hasRemoteVideo && (
          <video
            autoPlay
            playsInline
            className="w-full h-full md:h-full object-cover shadow-md border border-gray-300 dark:border-gray-700"
            ref={(videoEl) => {
              if (videoEl && remoteStream) {
                videoEl.srcObject = remoteStream;
              }
            }}
          />
        )}
      </div>

      <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 md:bottom-6 flex justify-center gap-6 dark:bg-gray-900 bg-white rounded-full shadow-lg px-6 py-3">
        <button
          onClick={toggleCamera}
          className={`p-3 ${isCameraOn?'bg-gray-500 hover:bg-gray-600':'bg-red-600 hover:bg-red-700'} text-white rounded-full transition`}
        >
          {isCameraOn?<CiVideoOn size={22} />:<CiVideoOff size={22} />}
        </button>
        <button
          onClick={toggleMic}
          className={`p-3 ${isMicOn?'bg-gray-500 hover:bg-gray-600':'bg-red-600 hover:bg-red-700'} text-white rounded-full transition`}
        >
          {isMicOn?<IoMicOutline size={22} />:<IoMicOffOutline size={22} />}

        </button>
        <button
          onClick={endCall}
          className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-full transition"
        >
          <MdCallEnd size={22} />
        </button>
      </div>
    </div>
  );
};

export default CallPage;
