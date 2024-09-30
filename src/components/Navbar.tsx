import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="flex flex-row justify-between items-center  p-5 md:p-3 bg-purple-200">
      <p className="text-lg font-bold text-purple-950">HARI'S APP</p>

      <div className="sm:hidden">
        <button onClick={toggleMenu}>
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } absolute top-16 left-0 w-full bg-purple-200 sm:flex sm:flex-row sm:relative sm:top-auto sm:left-auto sm:w-auto sm:bg-transparent sm:items-center sm:gap-10`}
      >
        <Link
          to={"/all-interest"}
          className="block p-4 text-purple-500 hover:underline sm:inline"
        >
          All interests
        </Link>
        <Link
          to={"/"}
          className="block p-4 text-purple-500 hover:underline sm:inline"
        >
          Profile
        </Link>
      </div>
    </div>
  );
}
