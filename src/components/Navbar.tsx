import React from "react";
import { IoLogInOutline } from "react-icons/io5";

const Navbar = () => {
  return (
    <nav className="sticky top-0 bg-neutral-900 p-4 flex justify-between items-center text-white">
      <span className="text-xl font-bold ">Postee</span>
      <div className="flex flex-col items-center hover:text-cyan-400 cursor-pointer font-semibold">
        <IoLogInOutline className="text-2xl" />
        <span className="tracking-tight text-[10px] uppercase">Sign in</span>
      </div>
    </nav>
  );
};

export default Navbar;
