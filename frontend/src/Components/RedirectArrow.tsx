import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const RedirectArrow = ({ route = "/", clickHandler }: { route?: string; clickHandler?: () => void }) => {
  const redirect = useNavigate();

  const handleClick = () => {
    redirect(route);
  };

  return (
    <button
      onClick={clickHandler ? clickHandler : handleClick}
      className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 dark:text-gray-200"
    >
      <IoIosArrowRoundBack className="inline-block mr-1" size={40} />
    </button>
  );
};

export default RedirectArrow;
