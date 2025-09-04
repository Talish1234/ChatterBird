import { useState } from "react";
import InputField from "../Components/InputFieldComponent/InputField";
import { useNavigate, useSearchParams } from "react-router-dom";
import RedirectArrow from "../Components/RedirectArrow";
import apiRequest from "../utils/apiRequest";
import { toast } from "react-toastify";

const ForgotPasswordPage = () => {
  const [searchParam] = useSearchParams();
  const token = searchParam.get('token');
  const [password, setPassword] = useState<string>("");
  const redirect = useNavigate();

  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password) return;
    try {
      const response = await apiRequest.put("/email/reset-password", {
        token:token,
        password,
      });

      if (response && response.data) {
        toast.success('Password reset successfully')
        redirect("/login");
      }
    } catch (error) {
      toast.error("Invalid token");
    }
  };

  return (
    <div className="dark:bg-gray-900 bg-gray-100 h-screen flex items-center justify-center px-4 sm:px-6">
      <RedirectArrow className="fixed left-4 top-4"/>

      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg flex flex-col gap-6 p-6 sm:p-8 rounded-2xl shadow-md bg-white dark:bg-gray-800 dark:text-white">
        <h1 className="text-2xl sm:text-3xl font-bold text-center">
          Reset Password
        </h1>
        
     
          <form className="flex flex-col gap-4" onSubmit={handleSubmitLogin}>
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
                Reset Password
              </button>
           
            </div>
          </form>
        </div>
      </div>
  );
};

export default ForgotPasswordPage;
