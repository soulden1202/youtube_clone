import React, { Dispatch, SetStateAction } from "react";
import useAuthStore from "../../store/authStore";
import NoResults from "../NoResults";
import CommentInput from "./Atoms/CommentInput";
import CommentItem from "./Atoms/CommentItem";
import { useComments } from "./Hooks/useComments";

export interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: {
    image: string;
    userName: string;
    _ref: string;
    _id: string;
  };
  commentAt: string;
}

interface IProps {
  comment: string;
  addComment: (e: React.FormEvent | any) => void;
  setComment: Dispatch<SetStateAction<string>>;
  comments: IComment[];
  setallcommnets?: Dispatch<SetStateAction<IComment[]>>;
}

const Comments = ({ comment, comments, addComment, setComment }: IProps) => {
  const { userProfile }: { userProfile: any } = useAuthStore();
  const { isCommentDisable, isFocused, setIsFocused, handleFocus, handleCancel } =
    useComments(comment, setComment);

  const handleSubmit = (e: React.FormEvent) => {
    addComment(e);
    setIsFocused(false);
  };

  return (
    <div>
      <div className="flex flex-col">
        <div>
          {userProfile && (
            <div className="flex flex-col wi-full">
              <CommentInput
                userProfile={userProfile}
                comment={comment}
                setComment={setComment}
                onSubmit={handleSubmit}
                onFocus={handleFocus}
              />
              {isFocused && (
                <div className="flex flex-row justify-end gap-4 mt-3">
                  <button onClick={handleCancel} className=" text-gray-500">
                    Cancel
                  </button>
                  <button
                    className="disabled:bg-gray-500 border-1 p-2 rounded bg-blue-500 dark:text-white"
                    disabled={isCommentDisable}
                    onClick={handleSubmit}
                  >
                    Comment
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="mt-10" />
        <div className="flex flex-col gap-10 ml-4">
          {comments?.length > 0 ? (
            comments
              .slice(0)
              .reverse()
              .map((c) => <CommentItem key={c._key} comment={c} />)
          ) : (
            <NoResults text="No comments" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;
