import React from 'react'

const CommentForm = () => {
  return (
    <form>
        <textarea placeholder="Comment here..." className='text-sm resize-none outline-none px-2 py-1 text-neutral-500 mb-4 bg-transparent border border-neutral-800 w-full' />
    </form>
  )
}

export default CommentForm