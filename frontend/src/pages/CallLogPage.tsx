import { useEffect, useState } from "react";
import {
  MdCallReceived,
  MdCallMade,
  MdCallMissed,
  MdBlock,
} from "react-icons/md";
import apiRequest from "../utils/apiRequest";
import { useSelector } from "react-redux";
import type { RootState } from "../Redux/Store";
import { format } from "timeago.js";

interface Loguser {
  _id: string;
  name: string;
}

interface Logs {
  createdAt: Date;
  receiverId: Loguser;
  type: string;
  userId: Loguser;
  _id: string;
}

const CallLogPage = () => {
  const [logs, setLogs] = useState<Logs[]>([]);
  const authUser = useSelector((state: RootState) => state.authUser.user);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await apiRequest.get("/call/get-all-logs");
        if (res.data && res.data.log) {
          console.log(res.data.log);
          setLogs(res.data.log);
        }
      } catch (err) {
        console.error("Error fetching logs:", err);
      }
    };
    fetchLogs();
  }, []);

  const getCallIcon = (type: string) => {
    switch (type) {
      case "incoming":
        return <MdCallReceived className="text-green-500" size={22} />;
      case "outgoing":
        return <MdCallMade className="text-blue-500" size={22} />;
      case "missed":
        return <MdCallMissed className="text-red-500" size={22} />;
      case "rejected":
        return <MdBlock className="text-gray-500" size={22} />;
      default:
        return <MdCallReceived size={22} />;
    }
  };

  return (
    <div className={`h-full w-full pb-16 overflow-y-scroll bg-gray-100 dark:bg-gray-900 transition`}>
      <div className="max-w-3xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Call Logs
          </h1>
        </div>

        {/* Logs list */}
        <div className="space-y-3">
          {logs.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">
              No call logs found.
            </p>
          ) : (
            logs.map((log) => (
              <div
                key={log._id}
                className="flex items-center gap-4 p-4 rounded-2xl shadow-sm bg-white dark:bg-gray-800 hover:shadow-md transition"
              >
                <div>
                  {authUser?._id === log.userId._id
                    ? getCallIcon("outgoing")
                    : getCallIcon(log.type)}
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-gray-100 font-medium capitalize">
                    {authUser?._id === log.userId._id ? "outgoing" : log.type}{" "}
                    call
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {log.userId.name} → {log.receiverId.name}
                  </p>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {format(log.createdAt)}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CallLogPage;
