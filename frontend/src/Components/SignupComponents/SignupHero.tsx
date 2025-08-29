import SignupMethod from "./SignupMethod";

const SignupHero = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-20 px-6 md:px-10 lg:px-20 w-full md:w-[90%] lg:w-[70%] md:min-h-[calc(100vh-160px)]">
      {/* Left Section */}
      <div className="flex flex-col gap-4 text-center md:text-left max-w-lg md:max-w-xl lg:max-w-2xl">
        <h3 className="font-bold text-white leading-snug text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
          Chat made simple, connections made stronger.
        </h3>
        <p className="text-gray-200 text-sm sm:text-base md:text-lg">
          Join our community and experience seamless communication like never
          before.
        </p>
      </div>

      {/* Right Section */}
      <SignupMethod />
    </div>
  );
};

export default SignupHero;
