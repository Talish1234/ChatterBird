import Logo from "../Components/Logo";
import SignupHero from "../Components/SignupComponents/SignupHero";
import { useSelector } from "react-redux";
import type { RootState } from "../Redux/Store";
import { Navigate } from "react-router-dom";

const WelcomePage = () => {
  const authUser = useSelector((state: RootState) => state.authUser.user);

  if (authUser) return <Navigate to="/chats" replace />;

  return (
    <div className="min-h-screen flex flex-col justify-between md:justify-start md:items-center bg-[radial-gradient(circle_at_center,_#43116A,_#0A1832)] overflow-y-auto [&::-webkit-scrollbar]:w-[5px]">
      {/* Logo always centered */}
      <Logo className="flex justify-center py-6 md:py-8" />

      {/* Hero Section */}
      <SignupHero />

      {/* Extra spacing on small screens */}
      <div className="h-6 md:hidden" />
    </div>
  );
};

export default WelcomePage;
