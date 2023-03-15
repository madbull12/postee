import { useSession } from 'next-auth/react'
import React,{ useState } from 'react'
import { toast } from 'react-hot-toast'
import { CommentWithPayload } from 'types'
import { api } from 'y/utils/api'
import Avatar from './Avatar'
import CommentForm from './CommentForm'

const Comment = ({ comment,postId }: { comment:CommentWithPayload,postId:string }) => {
    const { data:session } = useSession();
  const [isReplying, setIsReplying] = useState(false);
  const [textComment, setTextComment] = useState("");
  const utils = api.useContext();
  const { mutateAsync: createComment } = api.comment.createComment.useMutation({
    onSettled: async () => {
      await utils.post.getAllPosts.invalidate();
    },
  });
  const handleChangeComment = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setTextComment(e.currentTarget.value);
  };
  const handleAddComment = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsReplying(false)

    await toast.promise(
      createComment({ postId: postId, text: textComment,parentId:comment.id }),
      {
        loading: "Adding a comment",
        success: "Comment successfully added",
        error: (err) => `Oops... something went wrong ${err}`,
      }
    );
  };

  console.log(comment.childComments)

  return (
    <>
    <div className="relative space-y-2 border border-neutral-800 bg-neutral-900 p-4 text-white">
      <div className="flex items-center gap-x-2">
        <Avatar src={comment.author.image as string} />
        <span>{comment.author.name}</span>
      </div>

      <p className="text-xs text-gray-400 md:text-sm">{comment.content}</p>

      {/* {session?.user.id === comment.author.id ? (
        <EditTools id={comment.id} />
      ) : null} */}
    </div>
    <button
      onClick={() => setIsReplying(!isReplying)}
      className="bg-neutral-700 px-2 py-1 text-xs font-semibold uppercase tracking-tight text-neutral-300"
    >
      {isReplying ? "Cancel" : "Reply"}
    </button>
    {isReplying ? (
      <div className="pl-4 border-l-4 border-neutral-600">
        <CommentForm
        onSubmit={handleAddComment}
          onChange={handleChangeComment}
        />
      </div>
    ) : null}
    
    <div className='pl-4 border-l-4 border-neutral-600 space-y-4'>

    {comment.childComments?.map((comment)=>(
        <Comment postId={postId} comment={comment as CommentWithPayload} />
    ))}
    </div>

  </>
  )
}

export default Comment