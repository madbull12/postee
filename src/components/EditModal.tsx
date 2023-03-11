import React, { useRef, useState } from "react";
import { useClickOutside } from "y/hooks/useOutsideClick";
import { api } from "y/utils/api";
import { useEditModal, usePostId } from "y/zustand/editModal";
import Backdrop from "./Backdrop";
import { toast } from "react-hot-toast";

import { BiLoaderAlt } from "react-icons/bi";
const EditModal = () => {
  const modalRef = useRef<HTMLFormElement>(null);
  const { setModal } = useEditModal();

  const clickOutsidehandler = () => {
    setModal(false);
  };

  useClickOutside(modalRef, clickOutsidehandler);
  const { postId } = usePostId();

  const { data: post, isLoading } = api.post.getPostDetails.useQuery({
    id: postId as string,
  });
  const utils = api.useContext();
  const [newTitle, setNewTitle] = useState(post?.title);
  const [newContent, setNewContent] = useState(post?.content);
  const { mutateAsync: updatePost} = api.post.updatePost.useMutation({
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

  const handleUpdatePost = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setModal(false)
    
    await toast.promise(updatePost({ title:newTitle as string, content:newContent as string,id:postId }), {
      loading: "Updating post",
      success: "Post updated successfully",
      error: (err) => `Oops something went wrong ${err}`,
    });



  };

  //   if (isLoading) return <BiLoaderAlt className="animate-spin" />;

  return (
    <Backdrop>
      <form
        ref={modalRef}
        onSubmit={handleUpdatePost}
        className="mx-auto h-[250px] w-3/4 space-y-4 overflow-y-scroll  rounded-2xl bg-neutral-900  p-4 text-white sm:w-1/2"
      >
        {isLoading ? (
          <BiLoaderAlt className="animate-spin" />
        ) : (
          <>
            <h1 className=" text-center text-2xl font-bold">Edit modal</h1>
            <input
              onChange={(e) => setNewTitle(e.target.value)}
              type="text"
              defaultValue={post?.title}
              className="w-full  rounded-lg border border-neutral-800 bg-transparent p-2 text-sm text-gray-400  outline-none"
              placeholder="Change title"
            />
            <textarea
              defaultValue={post?.content}
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full resize-none  rounded-lg border border-neutral-800 bg-transparent p-2 text-sm text-gray-400  outline-none"
              placeholder="Change your content"
            />
            <button className="rounded-lg  bg-cyan-500  p-2 text-sm font-bold text-white hover:bg-cyan-600">
              Edit
            </button>
          </>
        )}
      </form>
    </Backdrop>
  );
};

export default EditModal;
