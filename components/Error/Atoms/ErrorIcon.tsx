import React from "react";
import { BiError } from "react-icons/bi";

const ErrorIcon: React.FC = () => {
  return (
    <p className="text-8xl dark:text-white">
      <BiError />
    </p>
  );
};

export default ErrorIcon;
