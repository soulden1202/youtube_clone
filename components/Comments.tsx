import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import useAuthStore from "../store/authStore";

import NoResults from "./NoResults";
import Image from "next/image";
import moment from "moment";

interface IProps {
  comment: string;
  addComment: (e: React.FormEvent) => void;
  setComment: Dispatch<SetStateAction<string>>;
  comments: IComment[];
  setallcommnets: Dispatch<SetStateAction<IComment[]>>;
}

interface IComment {
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

const Comments = ({ comment, comments, addComment, setComment }: IProps) => {
  const { userProfile }: { userProfile: any } = useAuthStore();
  const [isCommentDisable, setisCommentDisable] = useState(true);

  const [isFocused, setisFocused] = useState(false);

  useEffect(() => {
    if (comment?.length > 0) {
      setisCommentDisable(false);
    } else {
      setisCommentDisable(true);
    }
  }, [comment]);

  return (
    <div>
      <div className="flex flex-col">
        <div>
          {userProfile && (
            <div className="flex flex-col wi-full">
              <form
                onSubmit={(e) => {
                  addComment(e);
                  setisFocused(false);
                }}
                className="flex flex-row gap-4"
              >
                <div>
                  <>
                    <Image
                      width={45}
                      height={45}
                      className="rounded-full cursor-pointer"
                      src={userProfile.image}
                      alt="user-profile"
                    ></Image>
                  </>
                </div>
                <input
                  type="text"
                  id="input"
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                  onFocus={() => setisFocused(true)}
                  placeholder="Add your comments..."
                  className="dark:text-white dark:bg-black w-full outline-0 border-b border-gray-500 dark:focus:border-white focus:border-black"
                />
              </form>
              {isFocused && (
                <div className="flex flex-row justify-end gap-4 mt-3">
                  <button
                    onClick={() => {
                      setComment("");
                      setisFocused(false);
                    }}
                    className=" text-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    className="disabled:bg-gray-500 border-1 p-2 rounded bg-blue-500 dark:text-white"
                    disabled={isCommentDisable}
                    onClick={(e) => {
                      addComment(e);
                      setisFocused(false);
                    }}
                  >
                    Comment
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="mt-10">
          <span> </span>
        </div>
        <div className="flex flex-col gap-10">
          {comments?.length > 0 ? (
            comments
              .slice(0)
              .reverse()
              .map((comment) => (
                <div className="flex flex-row w-full gap-5">
                  <div>
                    <>
                      {comment?.postedBy?.image && (
                        <Image
                          width={45}
                          height={45}
                          className="rounded-full cursor-pointer"
                          src={
                            comment?.postedBy?.image ||
                            "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                          }
                          alt="user-comment-profile"
                        ></Image>
                      )}
                    </>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-row items-baseline">
                      <span className="dark:text-white mr-3 font-semibold">
                        {comment?.postedBy?.userName}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {moment(comment.commentAt).fromNow()}
                      </span>
                    </div>
                    <div>
                      <span className="dark:text-white text-lg">
                        {comment.comment}
                      </span>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <NoResults text="No comments" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;
