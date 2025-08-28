import type { signupFormData } from "../Interfaces/interface";
import InputField from "../Components/InputFieldComponent/InputField";
import { useState } from "react";
import RedirectArrow from "../Components/RedirectArrow";
import apiRequest from "../utils/apiRequest";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const redirect = useNavigate();

  const [signupFormData, setSignupFormData] = useState<signupFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (signupFormData.password !== signupFormData.confirmPassword) {
        console.error("Passwords do not match");
        return;
      }

      const response = await apiRequest.post('/email/signup', {
        name: signupFormData.name,
        email: signupFormData.email,
        password: signupFormData.password
      });

      if (response && response.data.success) {
        redirect("/login");
      } 

    } catch (error) {
      console.error("Signup Error:", error);
    }
  };

  return (
     <div className=" dark:bg-gray-800 p-4 h-screen flex items-center justify-center">
      <RedirectArrow />
      <form className=" w-full max-w-xs flex flex-col gap-6 dark:text-white" onSubmit={handleSignup}>
        <h1 className="text-2xl font-bold mb-4 text-center">
          Sign up with Email
        </h1>
        <p className="text-gray-600 text-center dark:text-gray-100">
          Don’t just text—connect. Sign up and start chatting today!
        </p>
        <div className="flex flex-col gap-4 w-full">
            <InputField
            required={true}
            label="Your Name"
            type="name"
            value={signupFormData.name}
            onChangeInputField={(e) => setSignupFormData({ ...signupFormData, name: e.target.value })}
            className="border-b-3 border-gray-300"
          />
          <InputField
            required={true}
            label="Your Email"
            type="email"
            value={signupFormData.email}
            onChangeInputField={(e) => setSignupFormData({ ...signupFormData, email: e.target.value })}
            className="border-b-3 border-gray-300"
          />
          <InputField
            required={true}
            label="Your Password"
            type="password"
            value={signupFormData.password}
            onChangeInputField={(e) => setSignupFormData({ ...signupFormData, password: e.target.value })}
            className="border-b-3 border-gray-300"
          />
          <InputField
            required={true}
            label="Confirm Password"
            type="password"
            value={signupFormData.confirmPassword}
            onChangeInputField={(e) => setSignupFormData({ ...signupFormData, confirmPassword: e.target.value })}
            className="border-b-3 border-gray-300"
          />
          <div className="text-center py-4">
            <button className="bg-gray-300 text-gray-500 font-bold py-2 px-4 rounded-lg w-full hover:bg-teal-800 hover:text-white transition-all duration-300 ease-in-out mb-4 dark:hover:bg-teal-600">
              Create an account
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
