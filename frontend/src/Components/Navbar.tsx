import type { JSX } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { LuMessageCircleMore } from "react-icons/lu";
import { MdOutlineExplore } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ className }: { className?: string }) => {
  const location = useLocation();

  const links: Array<{ path: string; icon: JSX.Element; label: string }> = [
    { path: "/user/chats", icon: <LuMessageCircleMore size={28} />, label: "Chats" },
    { path: "/user/explore", icon: <MdOutlineExplore size={28} />, label: "Explore" },
    { path: "/user/settings", icon: <AiOutlineSetting size={28} />, label: "Settings" },
  ];

  return (
    <nav
      aria-label="Main navigation"
      className={`w-full md:w-max ${className} 
        dark:bg-gray-900 dark:text-gray-400 text-gray-700 bg-gray-100 
        shadow-md md:shadow-none`}
    >
      <ul className="flex flex-wrap md:flex-col gap-4 h-full items-center justify-center p-2 md:p-4">
        {links.map((link) => {
          const isActive = location.pathname === link.path;

          return (
            <li
              key={link.path}
              className={`p-2 rounded-xl transition-all duration-300 ease-in-out 
                ${isActive
                  ? "bg-teal-100 dark:bg-teal-800 text-teal-700 dark:text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-teal-600"
                }`}
            >
              <Link 
                to={link.path} 
                className="flex flex-col md:flex-row items-center gap-1 md:gap-2"
                aria-label={link.label}
              >
                {link.icon}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
