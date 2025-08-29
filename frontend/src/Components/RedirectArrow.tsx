import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

type RedirectArrowProps = {
  route?: string;
  clickHandler?: () => void;
  className?: string;
};

const RedirectArrow = ({ route = "/", clickHandler ,className}: RedirectArrowProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (clickHandler) clickHandler();
    else navigate(route);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Go back"
      className={`text-gray-500 hover:text-gray-700 dark:text-gray-200 ${className}`}
    >
      <IoIosArrowRoundBack className="inline-block mr-1" size={40} />
    </button>
  );
};

export default RedirectArrow;
