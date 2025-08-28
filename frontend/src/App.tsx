import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MotionComponent from "./Components/MotionComponent";
import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AuthRoute from "./Components/ProtectedRouteComponent/AuthRoute";
import ChatsPage from "./pages/ChatsPage";
import Navbar from "./Components/Navbar";

const App = () => {
  const [darkmode, setDarkmode] = useState<boolean>(false);
  const location = useLocation();
  return (
    <div
      data-theme={darkmode ? "dark" : "light"}
      className="relative min-h-screen overflow-x-hidden"
    >
      <button
        onClick={() => setDarkmode(!darkmode)}
        className="fixed top-4 right-4 p-2 bg-gray-900 dark:bg-gray-200 rounded-md w-10 h-10 z-40"
      />

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
            path="/chats"
            element={
              <AuthRoute path="/login">
                <ChatsPage />
              </AuthRoute>
            }
          />
          <Route path="/explore" element={<Navbar />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </MotionComponent>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkmode ? "dark" : "light"} // matches your theme toggle
        limit={3}
        stacked
      />
    </div>
  );
};

export default App;
