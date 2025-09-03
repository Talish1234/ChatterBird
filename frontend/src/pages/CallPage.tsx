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
import { CiVideoOn } from "react-icons/ci";
import { IoMicOutline } from "react-icons/io5";
import apiRequest from "../utils/apiRequest";

const CallPage = () => {
  const redirect = useNavigate();
  const location = useLocation();
  const { remoteUserId } = useParams();
  const { remoteUser } = location.state || {};
  const [searchParams] = useSearchParams();
  const callType = searchParams.get("call-type");
  const authUser = useSelector((state: RootState) => state.authUser.user);

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

  // Incoming call (callee side)
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

      console.log("Incoming Call from:", from);

      const ans = await peer.getAnswer(offer);
      socket.emit("call-accepted", { to: from, ans });
    },
    []
  );

  // Call accepted (caller side receives answer)
  const handleAcceptedCall = useCallback(
    async ({ from, ans }: { from: string; ans: RTCSessionDescriptionInit }) => {
      console.log("Call accepted by:", from);
      await peer.setRemoteDescription(ans);
    },
    []
  );

  // Handle remote track
  useEffect(() => {
    peer.peer.addEventListener("track", (ev) => {
      const [stream] = ev.streams;
      console.log("Received Remote Stream");
      setRemoteStream(stream);
    });
  }, []);

  // ICE candidates
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
      } catch (err) {
        console.error("Error adding received ice candidate", err);
      }
    });

    return () => {
      socket.off("ice-candidate");
    };
  }, [remoteSocketId]);

  // Toggle camera
  const toggleCamera = useCallback(() => {
    if (authStream) {
      const videoTrack = authStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        console.log("Camera:", videoTrack.enabled);
      }
    }
  }, [authStream]);

  // Toggle mic
  const toggleMic = useCallback(() => {
    if (authStream) {
      const audioTrack = authStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        console.log("Mic:", audioTrack.enabled);
      }
    }
  }, [authStream]);

  // End call
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
        {
          urls: "turn:openrelay.metered.ca:80",
          username: "openrelayproject",
          credential: "openrelayproject",
        },
        {
          urls: "stun:openrelay.metered.ca:80",
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
      console.log("Call ended by remote user");

      if (authStream) {
        authStream.getTracks().forEach((track) => track.stop());
        setAuthStream(null);
      }

      setRemoteStream(null);

      peer.peer.close();

      peer.peer = new RTCPeerConnection({
        iceServers: [
          {
            urls: "turn:openrelay.metered.ca:80",
            username: "openrelayproject",
            credential: "openrelayproject",
          },
          {
            urls: "stun:openrelay.metered.ca:80",
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
    console.log(callType);
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

  if (!remoteUserId) return <></>;

  // Helper to check if remote has active video
  const hasRemoteVideo =
    remoteStream &&
    remoteStream
      .getVideoTracks()
      .some((track) => track.readyState === "live" && track.enabled);

  return (
    <div className="w-[100vw] min-h-screen flex items-center dark:bg-gray-800 bg-white transition-colors duration-300 pb-16 md:pb-0">
      {/* Remote profile when audio-only */}
      {!hasRemoteVideo && (
        <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40">
          <img
            src={remoteUser?.profilePicture}
            alt="Remote User"
            className="w-36 h-36 md:h-42 md:w-42 rounded-full shadow-lg object-cover"
          />
        </div>
      )}

      {/* Video container */}
      <div className="w-full h-full relative bg-transparent">
        {/* Local */}
        {authStream && (
          <video
            autoPlay
            playsInline
            muted
            className="w-20 aspect-[9/16]  md:aspect-video md:w-60 rounded-lg border border-amber-50 object-cover absolute bottom-16 right-2 md:bottom-8 md:right-8"
            ref={(videoEl) => {
              if (videoEl && authStream) {
                videoEl.srcObject = authStream;
              }
            }}
          />
        )}

        {/* Remote (only if video track active) */}
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

      {/* Controls */}
      <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 md:bottom-6 flex justify-center gap-6 dark:bg-gray-900 bg-white rounded-full shadow-lg px-6 py-3">
        <button
          onClick={toggleCamera}
          className="p-3 bg-gray-500 hover:bg-gray-600 text-white rounded-full transition"
        >
          <CiVideoOn size={22} />
        </button>
        <button
          onClick={toggleMic}
          className="p-3 bg-gray-500 hover:bg-gray-600 text-white rounded-full transition"
        >
          <IoMicOutline size={22} />
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
