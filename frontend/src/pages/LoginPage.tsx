import { useState } from "react";
import InputField from "../Components/InputFieldComponent/InputField";
import { Link, useNavigate } from "react-router-dom";
import RedirectArrow from "../Components/RedirectArrow";
import GoogleButton from "../Components/Button/GoogleButton";
import apiRequest from "../utils/apiRequest";
import { useDispatch } from "react-redux";
import { login } from "../Redux/authSlice";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const redirect = useNavigate();
  const dispatch = useDispatch();

  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) return;
    try {
      const response = await apiRequest.post("/email/login", {
        email,
        password,
      });

      if (response && response.data.success) {
        console.log("Login Successful:", response.data.user);
        dispatch(login(response.data.user));
        redirect("/chats");
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="dark:bg-gray-900 bg-gray-100 h-screen flex items-center justify-center px-4 sm:px-6">
      <RedirectArrow className="fixed left-4 top-4"/>

      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg flex flex-col gap-6 p-6 sm:p-8 rounded-2xl shadow-md bg-white dark:bg-gray-800 dark:text-white">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center">
          Log in to Chatbox
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-center text-sm sm:text-base">
          Welcome back! Sign in using your social account or email to continue.
        </p>

        {/* Signup Options */}
        <div className="flex flex-col gap-4">
          <GoogleButton />

          {/* Divider */}
          <div className="flex items-center w-full my-2">
            <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600"></div>
            <span className="px-3 text-gray-500 dark:text-gray-400 text-sm sm:text-base font-medium">
              OR
            </span>
            <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600"></div>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-4" onSubmit={handleSubmitLogin}>
            <InputField
              required
              label="Your Email"
              type="email"
              value={email}
              onChangeInputField={(e) => setEmail(e.target.value)}
              className="border-b-2 border-gray-300 dark:border-gray-600"
            />
            <InputField
              required
              label="Your Password"
              type="password"
              value={password}
              onChangeInputField={(e) => setPassword(e.target.value)}
              className="border-b-2 border-gray-300 dark:border-gray-600"
            />

            <div className="flex flex-col items-center gap-3 mt-4">
              <button className="bg-teal-700 text-white font-semibold py-2.5 px-4 rounded-lg w-full hover:bg-teal-800 dark:hover:bg-teal-600 transition-all duration-300 ease-in-out">
                Log in
              </button>
              <Link
                to="/forgetpassword"
                className="text-teal-700 text-sm hover:underline dark:text-teal-500"
              >
                Forgot password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
