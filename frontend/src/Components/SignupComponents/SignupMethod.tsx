import { MdAlternateEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import GoogleButton from "../Button/GoogleButton";

const SignupMethod = () => {
  const redirect = useNavigate();

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm sm:max-w-md md:max-w-sm lg:max-w-md">
      {/* Google signup */}
      <GoogleButton />

      {/* Divider */}
      <div className="flex items-center w-full my-4">
        <div className="flex-grow h-px bg-gray-400/50"></div>
        <span className="px-3 text-gray-300 text-sm font-medium">OR</span>
        <div className="flex-grow h-px bg-gray-400/50"></div>
      </div>

      {/* Email signup */}
      <button
        onClick={() => redirect("/signup")}
        className="flex items-center justify-center gap-3 px-4 sm:px-5 py-2.5 sm:py-3 w-full rounded-2xl bg-white text-gray-800 font-medium shadow-sm hover:shadow-lg hover:shadow-gray-500/40 transition-all duration-300 ease-in-out"
      >
        <MdAlternateEmail size={22} className="shrink-0" />
        <span className="text-sm sm:text-base">Sign up with Email</span>
      </button>

      {/* Already have an account */}
      <p className="text-white text-sm sm:text-base">
        Existing account?{" "}
        <Link
          to="/login"
          className="font-semibold hover:underline underline-offset-2"
        >
          Log in
        </Link>
      </p>
    </div>
  );
};

export default SignupMethod;
