import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { CommentWithPayload, PostWithPayload } from "types";
import { api } from "y/utils/api";
import Avatar from "./Avatar";
import EditTools from "./EditTools";
import { toast } from "react-hot-toast";
import CommentForm from "./CommentForm";

type UnionKeys<T> = T extends T ? keyof T : never;
type StrictUnionHelper<T, TAll> =
  T extends any
  ? T & Partial<Record<Exclude<UnionKeys<TAll>, keyof T>, never>> : never;

type StrictUnion<T> = StrictUnionHelper<T, T>

type Post = StrictUnion<PostWithPayload | CommentWithPayload>

const Post = ({
  post,
}: {
  post: Post;
}) => {
  const { data: session } = useSession();

  const [isReplying, setIsReplying] = useState(false);

  const [textComment, setTextComment] = useState("");

  const handleChangeComment = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setTextComment(e.currentTarget.value);
  };

  return (
    <>
      <div className="relative space-y-2 border border-neutral-800 bg-neutral-900 p-4 text-white">
        <div className="flex items-center gap-x-2">
          <Avatar src={post.author.image as string} />
          <span>{post.author.name}</span>
        </div>
        {post?.title ? (
          <h1 className="text-lg font-semibold md:text-xl">{post.title}</h1>

        ):null}

        <p className="text-xs text-gray-400 md:text-sm">{post.content}</p>

        {session?.user.id === post.author.id ? (
          <EditTools id={post.id} />
        ) : null}
      </div>
      <button
        onClick={() => setIsReplying(!isReplying)}
        className="bg-neutral-700 px-2 py-1 text-xs font-semibold uppercase tracking-tight text-neutral-300"
      >
        {isReplying ? "Cancel" : "Reply"}
      </button>
      {isReplying ? (
        <div className="ml-3">
          <CommentForm
            text={textComment}
            onChange={handleChangeComment}
            postId={post.id}
          />
        </div>
      ) : null}

      {post.comments.length > 0 ? (
        <></>
      ) : null}
    </>
  );
};

export default Post;
