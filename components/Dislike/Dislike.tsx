import React from "react";
import useAuthStore from "../../store/authStore";
import { useDislike } from "./Hooks/useDislike";
import { AiFillDislike, AiOutlineDislike } from "react-icons/ai";

interface IProps {
  handleDislike: () => void;
  handleUndislike: () => void;
  dislikes: any[];
}

const Dislike = ({ handleDislike, handleUndislike, dislikes }: IProps) => {
  const { userProfile }: { userProfile: any } = useAuthStore();
  const { totalDisLike, alreadyDisliked, setAlreadyDisliked } = useDislike(dislikes, userProfile);

  return (
    <div className="gap-2 flex flex-row items-center cursor-pointer">
      <div>
        {alreadyDisliked ? (
          <AiFillDislike
            className="dark:text-white text-xl"
            onClick={() => {
              handleUndislike();
              setAlreadyDisliked(false);
            }}
          />
        ) : (
          <AiOutlineDislike
            className="dark:text-white text-xl  "
            onClick={() => {
              handleDislike();
              setAlreadyDisliked(true);
            }}
          />
        )}
      </div>
      <div className="dark:text-white text-base">
        <span>{totalDisLike}</span>
      </div>
    </div>
  );
};

export default Dislike;
