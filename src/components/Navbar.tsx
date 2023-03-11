import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";
import Avatar from "./Avatar";

const Navbar = () => {
  const { status,data:session } = useSession();

  return (
    <nav className="sticky z-50  top-0  bg-neutral-900 p-4 text-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <span className="text-xl font-bold mr-auto">Postee</span>
        <button
          onClick={() => {
            status==="authenticated" ? signOut() : signIn("google")
          }}
          className="flex cursor-pointer  flex-col items-center mx-4 font-semibold hover:text-cyan-400"
        >
          {status === "authenticated" ? (
            <IoLogOutOutline className="text-2xl" />
          ) : (
            <IoLogInOutline className="text-2xl" />
          )}

          <span className="text-[10px] uppercase tracking-tight">
            {status === "authenticated" ? "Sign out" : "Sign in"}
          </span>
        </button>
        {status === "authenticated" ? <Avatar src={session?.user.image as string} /> : null}
      </div>
    </nav>
  );
};

export default Navbar;
