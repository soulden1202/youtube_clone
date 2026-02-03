import React from "react";
import { BiCommentX } from "react-icons/bi";
import { MdOutlineVideocamOff } from "react-icons/md";

interface NoResultsIconProps {
  isComment: boolean;
}

const NoResultsIcon: React.FC<NoResultsIconProps> = ({ isComment }) => {
  return (
    <p className="text-8xl dark:text-white">
      {isComment ? <BiCommentX /> : <MdOutlineVideocamOff />}
    </p>
  );
};

export default NoResultsIcon;
