import { MdAlternateEmail } from "react-icons/md";
import { Link, useNavigate  } from "react-router-dom";
import GoogleButton from "../Button/GoogleButton";
const SignupMethod = () => {
  const redirect = useNavigate();

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="px-10 flex flex-col items-center gap-1 w-full">
        <GoogleButton />
        {/* ---------- OR ----------*/}
        <div className="flex items-center w-[90%] my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-4 text-gray-500 font-medium">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>
        {/*Email*/}

        <button className="flex px-5 py-2 items-center justify-center gap-3 border-none bg-white rounded-2xl hover:shadow-lg hover:shadow-gray-500 w-full transition-all duration-300 ease-in-out " onClick={(e) => { e.preventDefault(); redirect("/signup"); }} >
          <MdAlternateEmail size={32} />
          SignUp with Email
        </button>
      </div>
      <span className="text-white">
        Existing account?{" "}
        <Link to="/login" className="font-semibold">
          Log in
        </Link>
      </span>
    </div>
  );
};

export default SignupMethod;
