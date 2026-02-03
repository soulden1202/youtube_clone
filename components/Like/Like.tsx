import React, { useEffect } from "react";
import useAuthStore from "../../store/authStore";
import { useLike } from "./Hooks/useLike";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";

interface IProps {
  handleLike: () => void;
  handleUnlike: () => void;
  likes: any[];
}

const Like = ({ likes, handleLike, handleUnlike }: IProps) => {
  const { userProfile }: { userProfile: any } = useAuthStore();
  const { totalLikes, setTotalLikes, alreadyLiked, setAlreadyLiked } = useLike(likes, userProfile);

  return (
    <div className="gap-2 flex flex-row items-center cursor-pointer ">
      <div className="">
        {alreadyLiked ? (
          <AiFillLike
            onClick={() => {
              handleUnlike();
              setAlreadyLiked(false);
              setTotalLikes(totalLikes - 1);
            }}
            className="dark:text-white text-xl"
          />
        ) : (
          <AiOutlineLike
            onClick={() => {
              handleLike();
              setAlreadyLiked(true);
              setTotalLikes(totalLikes + 1);
            }}
            className="dark:text-white text-xl "
          />
        )}
      </div>
      <div className="dark:text-white text-base">
        <span>{totalLikes}</span>
      </div>
    </div>
  );
};

export default Like;
