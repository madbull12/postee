import React from 'react'
import { CommentWithPayload, PostWithPayload } from 'types'
import Post from './Post'


const CommentList = ({ comments }:{ comments:CommentWithPayload[] }) => {
  return (
    <div className="space-y-4">
    {comments?.map((comment) => (
      <Post post={comment as CommentWithPayload} />
    ))}
  </div>
  )
}

export default CommentList