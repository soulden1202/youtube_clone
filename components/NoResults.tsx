import React from "react";
import { BiCommentX } from "react-icons/bi";
import { MdOutlineVideocamOff } from "react-icons/md";

interface IProps {
  text: string;
}

const NoResults = ({ text }: IProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <p className="text-8xl dark:text-white">
        {text === "No comments" ? (
          <BiCommentX></BiCommentX>
        ) : (
          <MdOutlineVideocamOff></MdOutlineVideocamOff>
        )}
      </p>
      <p className="text-2xl text-center dark:text-white">{text}</p>
    </div>
  );
};

export default NoResults;
