import React from 'react'
import { IoTrash } from 'react-icons/io5'
import { MdOutlineEditNote } from 'react-icons/md'
import { useEditModal } from 'y/zustand/editModal'
const EditTools = () => {
    const { setModal }  = useEditModal();
  return (
    <div className='absolute flex text-gray-400 items-center gap-x-2 bottom-2 right-2'>
        <button>
            <IoTrash />
        </button>
        <button onClick={()=>setModal(true)}>
            <MdOutlineEditNote className='text-lg' />
        </button>
    </div>
  )
}

export default EditTools