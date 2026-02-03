import React from "react";
import ErrorIcon from "./Atoms/ErrorIcon";

interface IProps {
  text: string;
}

const Error = ({ text }: IProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <ErrorIcon />
      <p className="text-2xl text-center dark:text-white">{text}</p>
    </div>
  );
};

export default Error;
