import React from 'react'
import { CommentWithPayload, PostWithPayload } from 'types'
import Comment from './Comment'


const CommentList = ({ comments,postId }:{ comments:CommentWithPayload[],postId:string }) => {
  return (
    <div className="space-y-4">
    {comments?.map((comment) => (
      <Comment postId={postId} comment={comment as CommentWithPayload}  />
    ))}
  </div>
  )
}

export default CommentList