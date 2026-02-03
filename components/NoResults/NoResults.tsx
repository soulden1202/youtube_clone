import React from "react";
import NoResultsIcon from "./Atoms/NoResultsIcon";

interface IProps {
  text: string;
}

const NoResults = ({ text }: IProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <NoResultsIcon isComment={text === "No comments"} />
      <p className="text-2xl text-center dark:text-white">{text}</p>
    </div>
  );
};

export default NoResults;
