import React from "react";

interface IProps {
  tags: string[];
}

const Sugestion = ({ tags }: IProps) => {
  return (
    <div className="bg-white dark:bg-black h-full">
      <div className="lg:w-400 w-full flex flex-col justify-start mb-10 lg:border-l-2 lg:border-t-0 border-t-2 border-gray-100  p-3">
        Test
      </div>
    </div>
  );
};

export default Sugestion;
