import { useSession } from "next-auth/react";
import React, { useState,useRef } from "react";
import { api } from "y/utils/api";
import { toast } from "react-hot-toast";
const CreateForm = () => {
  const { data: session } = useSession();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  console.log(session);

  const titleRef = useRef<HTMLInputElement>(null);
  const utils = api.useContext()
  const { mutateAsync: createPost } = api.post.createPost.useMutation({
    // onMutate: async (newEntry) => {
    //   await utils.post.getAllPosts.cancel();
    //   utils.post.getAllPosts.setData(undefined, (prevEntries) => {
    //     if (prevEntries) {
    //       return [newEntry, ...prevEntries];
    //     } else {
    //       return [newEntry];
    //     }
    //   });
    // },
    onSettled: async () => {
      await utils.post.getAllPosts.invalidate();
    },
  });

  const handleCreatePost = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    await toast.promise(createPost({ title, content }), {
      loading: "Creating post",
      success: "Post created successfully",
      error: (err) => `Oops something went wrong ${err}`,
    });


  };

  if (!session) return null;


  return (
    <form
      onSubmit={handleCreatePost}
      className=" mb-4 space-y-2 border border-neutral-800 p-4"
    >
      <h1 className="text-center text-2xl font-bold text-white">
        Write a post
      </h1>
      <input
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        ref={titleRef}
        className="w-full  rounded-lg border border-neutral-800 bg-transparent p-2 text-sm text-gray-400  outline-none"
        placeholder="Title here"
      />
      <textarea
        onChange={(e) => setContent(e.target.value)}
        className="w-full resize-none  rounded-lg border border-neutral-800 bg-transparent p-2 text-sm text-gray-400  outline-none"
        placeholder="Write your content"
      />

      <button className="rounded-lg  bg-cyan-500  p-2 text-sm font-bold text-white hover:bg-cyan-600">
        Post
      </button>
    </form>
  );
};

export default CreateForm;
