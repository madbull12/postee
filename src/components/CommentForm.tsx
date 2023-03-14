import React from 'react'

interface IProps {
  text:string;
  onChange:(e: React.FormEvent<HTMLTextAreaElement>)=>void;
  postId:string;
}
const CommentForm = ({ text,onChange,postId  }:IProps) => {
  return (
    <form>
        <textarea onChange={onChange} placeholder="Comment here..." className='text-sm resize-none outline-none px-2 py-1 text-neutral-500 mb-4 bg-transparent border border-neutral-800 w-full' />
    </form>
  )
}

export default CommentForm