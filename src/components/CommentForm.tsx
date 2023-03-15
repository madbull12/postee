import React from "react";
import { toast } from "react-hot-toast";
import { api } from "y/utils/api";

interface IProps {
  onChange: (e: React.FormEvent<HTMLTextAreaElement>) => void;
 
  onSubmit:(e:React.ChangeEvent<HTMLFormElement>) => void
}
const CommentForm = ({  onChange, onSubmit }: IProps) => {
  // const utils = api.useContext();
  // const { mutateAsync: createComment } = api.comment.createComment.useMutation({
  //   onSettled: async () => {
  //     await utils.post.getAllPosts.invalidate();
  //   },
  // });
  // const { mutateAsync: createFirstComment } = api.comment.createFirstComment.useMutation({
  //   onSettled: async () => {
  //     await utils.post.getAllPosts.invalidate();
  //   },
  // });

  // const handleAddComment = async (e:React.ChangeEvent<HTMLFormElement>) => {
  //   e.preventDefault();


  //   await toast.promise(
  //    isComment ? createComment({ postId, parentId: parentId as string, text }) : createFirstComment({ postId, text }),
  //     {
  //       loading: "Adding a comment",
  //       success: "Comment successfully added",
  //       error: (err) => `Oops... something went wrong ${err}`,
  //     }
  //   );
  // };

  return (
    <form onSubmit={onSubmit} >
      <textarea
        onChange={onChange}
        placeholder="Comment here..."
        className="mb-4 w-full resize-none border border-neutral-800 bg-transparent px-2 py-1 text-sm text-neutral-500 outline-none"
      />
      <button className="bg-neutral-700 px-2 py-1 text-xs font-semibold uppercase tracking-tight text-neutral-300">
        Submit
      </button>
    </form>
  );
};

export default CommentForm;
