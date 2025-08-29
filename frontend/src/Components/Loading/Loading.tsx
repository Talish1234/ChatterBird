import { FaEarlybirds } from "react-icons/fa6";

const Loading = ({
  animate = true,
  className,
}: {
  animate?: boolean;
  className?: string;
}) => {
  return (
    <div
      className={`flex items-center justify-center h-full font-display bg-gray-200 dark:bg-gray-900 ${className}`}
    >
      <div
        className={`text-4xl font-light text-center ${
          animate ? "animate-bounce" : ""
        }`}
      >
        <div className="relative text-teal-700 dark:text-teal-300 italic font-logo-display text-[12rem] md:text-[17rem] leading-[0.9] drop-shadow-md dark:drop-shadow-lg">
          C
          <FaEarlybirds
            className="absolute left-[68%] top-[58%] -translate-x-1/2 -translate-y-1/2 text-[4rem] md:text-[5rem] text-inherit drop-shadow-sm dark:drop-shadow-md"
          />
        </div>

        <span className="block italic text-gray-700 dark:text-gray-300 text-lg md:text-xl tracking-wide">
          Chatter-Bird
        </span>
      </div>
    </div>
  );
};

export default Loading;
