import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { PostWithPayload } from "types";
import { api } from "y/utils/api";
import Avatar from "./Avatar";
import EditTools from "./EditTools";
import { toast } from "react-hot-toast";
import CommentForm from "./CommentForm";

const Post = ({ post }: { post: PostWithPayload }) => {
  const { data: session } = useSession();

  const [isReplying, setIsReplying] = useState(false);

  return (
    <>
      <div className="relative space-y-2 border border-neutral-800 bg-neutral-900 p-4 text-white">
        <div className="flex items-center gap-x-2">
          <Avatar src={post.author.image as string} />
          <span>{post.author.name}</span>
        </div>
        <h1 className="text-lg font-semibold md:text-xl">{post.title}</h1>
        <p className="text-xs text-gray-400 md:text-sm">{post.content}</p>
        <button
          onClick={() => setIsReplying(!isReplying)}
          className="bg-neutral-700 px-2 py-1 text-xs font-semibold uppercase tracking-tight text-neutral-300"
        >
          {isReplying ? "Cancel" : "Reply"}
        </button>
        {session?.user.id === post.author.id ? (
          <EditTools id={post.id} />
        ) : null}
        {isReplying ? (
          <CommentForm />
        ):null}
      </div>

    </>
  );
};

export default Post;
