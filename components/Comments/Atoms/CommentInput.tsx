import React from "react";
import Image from "next/image";

interface CommentInputProps {
  userProfile: any;
  comment: string;
  setComment: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onFocus: () => void;
}

const CommentInput: React.FC<CommentInputProps> = ({
  userProfile,
  comment,
  setComment,
  onSubmit,
  onFocus,
}) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-row gap-4">
      <div>
        <Image
          width={45}
          height={45}
          className="rounded-full cursor-pointer"
          src={typeof userProfile?.image === 'string' 
    ? userProfile.image 
    : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
  }
          alt="user-profile"
        />
      </div>
      <input
        type="text"
        id="input"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onFocus={onFocus}
        placeholder="Add your comments..."
        className="dark:text-white dark:bg-black w-full outline-0 border-b border-gray-500 dark:focus:border-white focus:border-black"
      />
    </form>
  );
};

export default CommentInput;
