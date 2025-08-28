import Logo from "../Components/Logo";
import SignupHero from "../Components/SignupComponents/SignupHero";
import { useSelector } from "react-redux";
import type { RootState } from "../Redux/Store";
import { Navigate } from "react-router-dom";

const WelcomePage = () => {
  const authUser = useSelector((state: RootState) => state.authUser.user);

  if (authUser) 
  return <Navigate to="/chats" replace />;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_center,_#43116A,_#0A1832)] flex flex-col justify-around md:items-center gap-2 md:justify-start md:py-8 overflow-y-auto [&::-webkit-scrollbar]:w-[5px]">
      <Logo className="justify-center" />
      <SignupHero />
    </div>
  );
};

export default WelcomePage;
