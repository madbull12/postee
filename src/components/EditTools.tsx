import React from 'react'
import { IoTrash } from 'react-icons/io5'
import { MdOutlineEditNote } from 'react-icons/md'
import { api } from 'y/utils/api'
import { toast } from 'react-hot-toast'
import { useEditModal, usePostId } from 'y/zustand/editModal'
const EditTools = ({ id }:{ id:string }) => {
    const { setModal }  = useEditModal();
    const { setPostId }  = usePostId();
    const utils = api.useContext();
    const { mutateAsync: deletePost } = api.post.deletePost.useMutation({
      onSettled: async () => {
        await utils.post.getAllPosts.invalidate();
      },
    });
  
    const handleDeletePost = async() => {
      
      await toast.promise(deletePost({ id }), {
        loading: "Deleting post",
        success: "Post deleted successfully",
        error: (err) => `Oops something went wrong ${err}`,
      });
  
  
  
    };
  return (
    <div className='absolute flex text-gray-400 items-center gap-x-2 bottom-2 right-2'>
        <button onClick={handleDeletePost}>
            <IoTrash />
        </button>
        <button onClick={()=>{
            setPostId(id)
            setModal(true)
        }}>
            <MdOutlineEditNote className='text-lg' />
        </button>
    </div>
  )
}

export default EditTools