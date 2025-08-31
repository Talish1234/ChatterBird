import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose } from "react-icons/md";
import type { UserInfo } from "../../Interfaces/interface";
import apiRequest from "../../utils/apiRequest";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/authSlice";
import { toast } from "react-toastify";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserInfo | null;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  const [username, setUsername] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [profile, setProfile] = useState(user?.profilePicture || "");
  const [file, setFile] = useState<any>(null);
  const [disabled, setDisabled] = useState<boolean>(false);
  const dispatch = useDispatch();
  
const handleSave = async () => {
  if (username === user?.name && !file && bio === user?.bio) return;
  setDisabled(true);

  try {
    const formData = new FormData();
    formData.append("name", username);
    formData.append("bio", bio);
    if (file) {
      formData.append("image", file); // 👈 must match upload.single("image")
    }

    const response = await apiRequest.put("/user/update", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response && response.data) {
      dispatch(login(response.data.updatedUser));
      toast.success("Profile updated successfully!");
    }
  } catch (error) {
    toast.error("Something went wrong while updating your profile.");
  } finally {
    setDisabled(false);
    onClose();
  }
};

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setFile(file);
      setProfile(URL.createObjectURL(file));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
            >
              <MdClose size={22} />
            </button>

            <h2 className="text-xl font-semibold mb-4 text-center dark:text-gray-200">
              Edit Profile
            </h2>

            <div className="flex justify-center mb-4 relative overflow-hidden">
              <img
                src={profile || "https://via.placeholder.com/100"}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-4 border-teal-600"
              />

              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange} // <-- preview update function
              />
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 justify-self-start text-teal-700">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className=" w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 justify-self-start text-teal-700">
                  Bio
                </label>
                <input
                  type="text"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                disabled={disabled}
                onClick={handleSave}
                className="px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition"
              >
                Save
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditProfileModal;
