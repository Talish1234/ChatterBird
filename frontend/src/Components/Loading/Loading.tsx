import { FaEarlybirds } from "react-icons/fa6";

const Loading = ({animate = true, className}:{animate?:boolean,className?:string}) => {
  return (
    <div className={`flex items-center justify-center h-full font-display bg-gray-200 dark:bg-gray-900 ${className}`}>
      <div className={`loading-container text-4xl font-light text-center ${animate ? "animate-bounce-reverse" : ""}`}>
        <div className="md:text-[17rem] italic font-logo-display text-[12rem] leading-[0.9] text-teal-700 text-shadow-gray-700 text-shadow-lg dark:text-shadow-gray-500 dark:text-teal-300 relative">
          C
          <FaEarlybirds
            className="absolute left-[70%] top-[60%] -translate-x-1/2 -translate-y-1/2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.7)] dark:drop-shadow-[2px_2px_2px_rgba(255,255,255,0.5)]"
            color="currentColor"
            size="0.2em"
            strokeWidth={1}
          />
        </div>
        <span className="italic text-gray-700 text-shadow-md text-shadow-gray-700 dark:text-gray-300 dark:text-shadow-gray-300">
          Chatter-Bird
        </span>
      </div>
    </div>
  );
};

export default Loading;
