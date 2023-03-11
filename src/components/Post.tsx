import React from 'react'
import { PostWithPayload } from 'types'
import Avatar from './Avatar'
import EditTools from './EditTools'

const Post = ({ post }:{ post:PostWithPayload }) => {
  return (
    <div className='p-4 relative space-y-2 bg-neutral-900 border border-neutral-800 text-white'>
      <div className='flex items-center gap-x-2'>
        <Avatar src={post.author.image as string} />
        <span>{post.author.name}</span>
      </div>
      <h1 className='font-semibold text-lg md:text-xl'>{post.title}</h1>
      <p className='text-xs md:text-sm text-gray-400'>{post.content}</p>
      <EditTools />
    </div>
  )
}

export default Post