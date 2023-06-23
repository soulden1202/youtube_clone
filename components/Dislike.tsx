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

  const filterDislike = dislikes?.filter(
    (item) => item._ref === userProfile?.id
  );

  useEffect(() => {
    if (filterDislike?.length > 0) {
      setalreadyDisliked(true);
    } else {
      setalreadyDisliked(false);
    }
  }, [dislikes, filterDislike]);
  return (
    <div className="gap-2 flex flex-row items-center cursor-pointer">
      <div>
        {alreadyDisliked ? (
          <AiFillDislike
            className="dark:text-white text-xl"
            onClick={handleUndislike}
          ></AiFillDislike>
        ) : (
          <AiOutlineDislike
            className="dark:text-white text-xl  "
            onClick={handleDislike}
          ></AiOutlineDislike>
        )}
      </div>
      <div className="dark:text-white text-base">
        <span>{dislikes?.length || 0}</span>
      </div>
    </div>
  );
};

export default Dislike;
