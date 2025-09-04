import { FcGoogle } from "react-icons/fc"

import { useGoogleLogin } from "@react-oauth/google";
import apiRequest from "../../utils/apiRequest";
import type {CodeResponse} from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/authSlice";
import { toast } from "react-toastify";
const GoogleButton = () => {
  const redirect = useNavigate();
  const dispatch = useDispatch();
  
  const handleGoogleSignUp = async (codeResponse: CodeResponse) => {
    const response = await apiRequest.post("/google/signup", {
      code: codeResponse.code,
    });
    if (response.data && response.data.success) {
      toast.success('Login successfully');
      dispatch(login(response.data.user));
      redirect('/user/chats');
    } else {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  const onLogin = useGoogleLogin({
    onSuccess: handleGoogleSignUp,
    flow: "auth-code"
  });
  return (
          <button onClick={onLogin} className="flex px-5 py-2 items-center justify-center gap-3 border-1 bg-white rounded-2xl hover:shadow-lg hover:shadow-gray-300 w-full transition-all duration-300 ease-in-out dark:text-black">
            <FcGoogle size={32} /> Continue with Google
          </button>
  );
};
export default GoogleButton;