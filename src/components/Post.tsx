import { useSession } from "next-auth/react";
import React from "react";
import { PostWithPayload } from "types";
import { api } from "y/utils/api";
import Avatar from "./Avatar";
import EditTools from "./EditTools";
import { toast } from "react-hot-toast";


const Post = ({ post }: { post: PostWithPayload }) => {
  const { data: session } = useSession();

  return (
    <div className="relative space-y-2 border border-neutral-800 bg-neutral-900 p-4 text-white">
      <div className="flex items-center gap-x-2">
        <Avatar src={post.author.image as string} />
        <span>{post.author.name}</span>
      </div>
      <h1 className="text-lg font-semibold md:text-xl">{post.title}</h1>
      <p className="text-xs text-gray-400 md:text-sm">{post.content}</p>
      {session?.user.id === post.author.id ? <EditTools id={post.id} /> : null}
    </div>
  );
};

export default Post;
