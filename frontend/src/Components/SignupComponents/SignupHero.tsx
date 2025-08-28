import SignupMethod from "./SignupMethod";

const SignupHero = () => {
  return (
          <div className="flex flex-col gap-6 md:flex-row md:justify-center md:items-center lg:gap-20 md:gap-4 px-4 lg:w-[70%] md:w-[90%] md:h-[calc(100vh_-_160px)]">
        <div className="ml-8 flex flex-col gap-4">
          <h3 className="font-semibold text-white mb-4 leading-[1.2] md:w-125 md:text-7xl text-5xl">
            Chat made simple, connections made stronger.
          </h3>
          <p className="text-white">
            Join our community and experience seamless communication like never
            before.
          </p>
        </div>
        <SignupMethod />
      </div>
  );
};

export default SignupHero;
