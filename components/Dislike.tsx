import React, { useEffect, useState } from "react";
import { AiFillDislike, AiOutlineDislike } from "react-icons/ai";
import useAuthStore from "../store/authStore";

interface IProps {
  handleDislike: () => void;
  handleUndislike: () => void;
  dislikes: any[];
}

const Dislike = ({ handleDislike, handleUndislike, dislikes }: IProps) => {
  const { userProfile }: { userProfile: any } = useAuthStore();

  const [alreadyDisliked, setalreadyDisliked] = useState(false);
  const [totalDisLike, settotalDisLike] = useState(dislikes?.length || 0);

  const filterDislike = dislikes?.filter(
    (item) => item._ref === userProfile?.id
  );

  useEffect(() => {
    if (filterDislike?.length > 0) {
      setalreadyDisliked(true);
    } else {
      setalreadyDisliked(false);
    }
  }, []);
  return (
    <div className="gap-2 flex flex-row items-center cursor-pointer">
      <div>
        {alreadyDisliked ? (
          <AiFillDislike
            className="dark:text-white text-xl"
            onClick={() => {
              handleUndislike();
              setalreadyDisliked(false);
            }}
          ></AiFillDislike>
        ) : (
          <AiOutlineDislike
            className="dark:text-white text-xl  "
            onClick={() => {
              handleDislike();
              setalreadyDisliked(true);
            }}
          ></AiOutlineDislike>
        )}
      </div>
      <div className="dark:text-white text-base">
        <span>{totalDisLike}</span>
      </div>
    </div>
  );
};

export default Dislike;
