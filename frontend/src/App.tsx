import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MotionComponent from "./Components/MotionComponent";
import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AuthRoute from "./Components/ProtectedRouteComponent/AuthRoute";
import ChatsPage from "./pages/ChatsPage";
import SettingPage from "./pages/SettingPage";
import { useSelector } from "react-redux";
import type { RootState } from "./Redux/Store";
import UserLayout from "./UserLayout";
import CallPage from "./pages/CallPage";
import CallLogPage from "./pages/CallLogPage";

const App = () => {
  const setting = useSelector((state: RootState) => state.setting.setting);
  const location = useLocation();
  return (
    <div
      data-theme={setting.darkMode ? "dark" : "light"}
      className="relative min-h-screen overflow-x-hidden"
    >
      <MotionComponent
        key={location.pathname}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="absolute top-0 left-0 w-full h-full"
      >
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route
            path="/user"
            element={
              <AuthRoute path="/login">
                <UserLayout />
              </AuthRoute>
            }
          >
            <Route path="chats" element={<ChatsPage />} />
            <Route path="logs" element={<CallLogPage />} />
            <Route path="settings" element={<SettingPage />} />
            <Route path="call/:remoteUserId" element={<CallPage />} />
          </Route>

          <Route path="*" element={<h1 className="text-center">{"Page Not Found :("}</h1>} />
        </Routes>
      </MotionComponent>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={setting.darkMode ? "dark" : "light"}
        limit={3}
        stacked
      />
    </div>
  );
};

export default App;
