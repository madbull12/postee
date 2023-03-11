import Image from "next/legacy/image";
import React from "react";

const Avatar = ({ src }: { src: string }) => {
  return (
      <div className="h-8 w-8 relative">
        <Image
          objectFit="cover"
          className="rounded-full"
          layout="fill"
          src={src}
          alt="avatar"
        />
      </div>
  );
};

export default Avatar;
