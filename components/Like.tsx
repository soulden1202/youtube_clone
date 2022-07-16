import React, { useEffect, useState } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import useAuthStore from "../store/authStore";

interface IProps {
  handleLike: () => void;
  handleUnlike: () => void;
  likes: any[];
}

const Like = ({ likes, handleLike, handleUnlike }: IProps) => {
  const { userProfile }: { userProfile: any } = useAuthStore();

  const [alreadyLiked, setalreadyLiked] = useState(false);
  const filterLike = likes?.filter((item) => item._ref === userProfile?._id);


  useEffect(() => {
    if (filterLike?.length > 0) {
      setalreadyLiked(true);
    } else {
      setalreadyLiked(false);
    }
  }, [likes, filterLike]);

  return (
    <div className="gap-2 flex flex-row items-center cursor-pointer ">
      <div className="">
        {alreadyLiked ? (
          <AiFillLike
            onClick={handleUnlike}
            className="dark:text-white text-xl"
          ></AiFillLike>
        ) : (
          <AiOutlineLike
            onClick={handleLike}
            className="dark:text-white text-xl "
          ></AiOutlineLike>
        )}
      </div>
      <div className="dark:text-white text-base">
        <span>{likes?.length || 0}</span>
      </div>
    </div>
  );
};

export default Like;
