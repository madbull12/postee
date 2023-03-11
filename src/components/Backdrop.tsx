import React from "react";
// import { motion } from "framer-motion";
const Backdrop = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
    
      className="absolute z-[999999] min-h-[200vh] w-full  bg-[#00000080] py-16"
    >
      {children}
    </div>
  );
};

export default Backdrop;