import { Post } from '@prisma/client'
import React from 'react'
import { PostWithPayload } from 'types'
import Avatar from './Avatar'

const Post = ({ post }:{ post:PostWithPayload }) => {
  return (
    <div className='p-4 bg-neutral-900 border border-neutral-800 text-white'>
      <div className='flex items-center gap-x-2'>
        <Avatar src={post.author.image as string} />
        <span>{post.author.name}</span>
      </div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  )
}

export default Post