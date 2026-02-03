import React from "react";

interface VideoDescriptionProps {
  description: string;
  showDes: boolean;
  setShowDes: (v: boolean) => void;
}

const VideoDescription: React.FC<VideoDescriptionProps> = ({ description, showDes, setShowDes }) => {
  return (
    <div>
      {!showDes && (
        <span
          onClick={() => setShowDes(true)}
          className="ml-[2.9rem] cursor-pointer font-medium text-xs capitalize text-blue-500 dark:text-blue-500 hover:underline"
        >
          Show Description
        </span>
      )}

      {showDes && (
        <div className="ml-[2.9rem] mt-3">
          <div className="font-medium text-xs capitalize text-gray-500 dark:text-gray-300 ">
            {description}
          </div>
          <div className="mt-3 ">
            <span
              onClick={() => setShowDes(false)}
              className="cursor-pointer font-medium text-xs capitalize text-blue-500 dark:text-blue-500 hover:underline"
            >
              Hide Description
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoDescription;
