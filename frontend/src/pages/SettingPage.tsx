import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../Redux/Store";
import { useNavigate } from "react-router-dom";
import {
  MdDarkMode,
  MdNotifications,
  MdLogout,
  MdEdit,
  MdPrivacyTip,
} from "react-icons/md";
import EditProfileModal from "../Components/SettingsComponents/EditProfileModal";
import ToggleSettingButton from "../Components/SettingsComponents/ToggleSettingButton";
import AccountSettingButton from "../Components/SettingsComponents/AccountSettingButton";
import { logout } from "../Redux/authSlice";
import { changeSetting } from "../Redux/settingSlice";
import PrivacyPolicy from "../Components/SettingsComponents/PrivacyPolicy";

const SettingsPage = () => {
  const user = useSelector((state: RootState) => state.authUser.user);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [privacyPolicyOpen, setPrivacyPolicyOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const redirect = useNavigate();

  const setting = useSelector((state: RootState) => state.setting.setting);

  const handleLogout = () => {
    dispatch(logout());
    redirect("/");
  };

  return (
    <div className="dark:bg-gray-900 bg-gray-100 w-full min-h-screen flex items-center justify-center px-4 sm:px-6 py-6">
      <EditProfileModal
        user={user}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <div className="w-full max-w-md flex flex-col gap-6 p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-800 dark:text-white">
        <div className="flex flex-col items-center gap-3">
          {user?.profilePicture && (
            <img
              src={user.profilePicture}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-4 border-gray-400 dark:border-teal-700 shadow"
            />
          )}
          <h2 className="text-lg font-semibold">
            {user?.name || "Guest User"}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {user?.email}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400 mb-2">
            General
          </h3>

          <div className="flex flex-col divide-y divide-gray-300 dark:divide-gray-700 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <ToggleSettingButton
              onClick={() =>
                dispatch(
                  changeSetting({
                    darkMode: !setting.darkMode,
                    notification: setting.notification,
                  })
                )
              }
              checked={setting.darkMode}
              text="Dark Mode"
            >
              <MdDarkMode className="text-xl text-teal-600" />
            </ToggleSettingButton>
            <ToggleSettingButton
              checked={setting.notification}
              onClick={() =>
                dispatch(
                  changeSetting({
                    darkMode: setting.darkMode,
                    notification: !setting.notification,
                  })
                )
              }
              text="Enable Notifications"
            >
              <MdNotifications className="text-xl text-teal-600" />
            </ToggleSettingButton>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400 mb-2">
            Account
          </h3>
          <div className="flex flex-col divide-y divide-gray-300 dark:divide-gray-700 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <AccountSettingButton
              text="Edit Profile"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <MdEdit className="text-xl text-teal-600" />
            </AccountSettingButton>
            <AccountSettingButton
              text="Log Out"
              onClick={handleLogout}
              className="text-red-500 hover:bg-red-50"
            >
              <MdLogout className="text-xl" />
            </AccountSettingButton>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400 mb-2">
            About & Legal
          </h3>
          <div className="flex flex-col divide-y divide-gray-300 dark:divide-gray-700 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <AccountSettingButton
              onClick={() => setPrivacyPolicyOpen((prev) => !prev)}
              text="Privacy Policy"
            >
              <MdPrivacyTip className="text-xl text-teal-600" />
            </AccountSettingButton>

            <PrivacyPolicy privacyPolicyOpen={privacyPolicyOpen} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
