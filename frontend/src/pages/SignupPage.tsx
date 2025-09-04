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

  const [error, setError] = useState<string>("");

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (signupFormData.password !== signupFormData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await apiRequest.post("/email/signup", {
        name: signupFormData.name,
        email: signupFormData.email,
        password: signupFormData.password,
      });

      if (response?.data.success) {
        redirect("/login");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="dark:bg-gray-800 px-6 sm:px-8 py-6 h-screen flex items-center justify-center">
      <RedirectArrow className="fixed left-4 top-4" />
      <form
        className="w-full max-w-sm sm:max-w-md flex flex-col gap-6 bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl shadow-lg"
        onSubmit={handleSignup}
      >
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-center dark:text-white">
          Sign up with Email
        </h1>
        <p className="text-gray-600 text-center dark:text-gray-300 text-sm sm:text-base">
          Don’t just text—connect. Sign up and start chatting today!
        </p>

        {/* Show error message */}
        {error && (
          <div className="bg-red-100 text-red-600 text-sm p-2 rounded-md text-center">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-4 w-full">
          <InputField
            required
            label="Your Name"
            type="text"
            value={signupFormData.name}
            onChangeInputField={(e) =>
              setSignupFormData({ ...signupFormData, name: e.target.value })
            }
            className="border-b-2 border-gray-300 dark:border-gray-600 focus:border-teal-500"
          />
          <InputField
            required
            label="Your Email"
            type="email"
            value={signupFormData.email}
            onChangeInputField={(e) =>
              setSignupFormData({ ...signupFormData, email: e.target.value })
            }
            className="border-b-2 border-gray-300 dark:border-gray-600 focus:border-teal-500"
          />
          <InputField
            required
            label="Your Password"
            type="password"
            value={signupFormData.password}
            onChangeInputField={(e) =>
              setSignupFormData({ ...signupFormData, password: e.target.value })
            }
            className="border-b-2 border-gray-300 dark:border-gray-600 focus:border-teal-500"
          />
          <InputField
            required
            label="Confirm Password"
            type="password"
            value={signupFormData.confirmPassword}
            onChangeInputField={(e) =>
              setSignupFormData({
                ...signupFormData,
                confirmPassword: e.target.value,
              })
            }
            className="border-b-2 border-gray-300 dark:border-gray-600 focus:border-teal-500"
          />
          <div className="text-center py-2">
            <button className="bg-teal-600 text-white font-bold py-2 px-4 rounded-lg w-full hover:bg-teal-700 transition-all duration-300 ease-in-out">
              Create an account
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
