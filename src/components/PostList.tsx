import React from "react";
import { PostWithPayload } from "types";
import Post from "./Post";

const PostList = ({ posts }: { posts: PostWithPayload[] }) => {
  return (
    <div className="space-y-4">
      {posts?.map((post) => (
        <Post post={post as PostWithPayload}  />
      ))}
    </div>
  );
};

export default PostList;
