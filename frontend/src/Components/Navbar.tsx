import type { JSX } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { LuMessageCircleMore } from "react-icons/lu";
import { MdOutlineExplore } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ className }: { className?: string }) => {
  const location = useLocation();

  const links: Array<{ path: string; icon: JSX.Element }> = [
    { path: "/chats", icon: <LuMessageCircleMore size={32} /> },
    { path: "/explore", icon: <MdOutlineExplore size={32} /> },
    { path: "/settings", icon: <AiOutlineSetting size={32} /> },
  ];

  return (
    <nav
      className={`w-full md:w-max ${className} dark:bg-gray-900 dark:text-gray-400 text-gray-700 bg-gray-200`}
    >
      <ul className="flex md:flex-col gap-6 h-full items-center justify-center p-2">
        {links.map((link) => {
          const isActive = location.pathname === link.path;

          return (
            <li
              key={link.path}
              className={`p-2 border-b-4 md:border-l-4 md:border-b-0 transition-colors ${
                isActive
                  ? "border-teal-700 text-teal-700"
                  : "border-transparent hover:text-teal-600"
              }`}
            >
              <Link to={link.path} className="flex items-center">
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
