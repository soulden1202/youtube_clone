import React from "react";
import Image from "next/image";
import moment from "moment";

interface CommentItemProps {
  comment: any;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  return (
    <div className="flex flex-row w-full gap-5">
      <div>
        {comment?.postedBy?.image && (
          <Image
            width={45}
            height={45}
            className="rounded-full cursor-pointer"
            src={typeof comment?.postedBy?.image === 'string' 
    ? comment.postedBy.image 
    : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
  }
            alt="user-comment-profile"
          />
        )}
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
          <span className="dark:text-white text-lg">{comment.comment}</span>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
