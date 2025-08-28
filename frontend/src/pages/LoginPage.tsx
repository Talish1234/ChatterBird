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

    if (!email || !password) 
      return ;
    try {
      const response = await apiRequest.post('/email/login', {
        email,
        password
      });

      if (response && response.data.success) {
        console.log("Login Successful:", response.data.user);
        dispatch(login(response.data.user))
        redirect("/chats");
      }

    } catch (error) {
      console.error("Login Error:", error);
    }
  };
  return (
    <div className=" dark:bg-gray-800 p-4 h-screen flex items-center justify-center">
      <RedirectArrow/>
      <div className=" w-full max-w-xs flex flex-col gap-4 dark:text-white">
        <h1 className="text-2xl font-bold mb-4 text-center ">
          Log in to Chatbox
        </h1>
        <p className="text-gray-600 text-center dark:text-gray-100">
          Welcome back! Sign in using your social account or email to continue
          us
        </p>
        <div className="flex flex-col gap-4 w-full">
        <GoogleButton />
          {/* ---------- OR ----------*/}
          <div className="flex items-center w-full my-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-4 text-gray-500 font-medium">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>
          <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmitLogin}>
          <InputField
            required={true}
            label="Your Email"
            type="email"
            value={email}
            onChangeInputField={(e) => setEmail(e.target.value)}
            className="border-b-3 border-gray-300"
          />
          <InputField
            required={true}
            label="Your Password"
            type="password"
            value={password}
            onChangeInputField={(e) => setPassword(e.target.value)}
            className="border-b-3 border-gray-300"
          />
          <div className="text-center py-4">
            <button className="bg-gray-300 text-gray-500 font-bold py-2 px-4 rounded-lg w-full hover:bg-teal-800 hover:text-white transition-all duration-300 ease-in-out mb-4 dark:hover:bg-teal-600">
              Log in
            </button>
            <Link
              to="/forgetpassword"
              className="text-teal-800 text-sm mt-2 dark:text-teal-500"
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
