import React from "react";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import moment from "moment";

interface VideoInfoProps {
  caption: string;
  userName: string;
  viewCount: number;
  createdAt: string;
}

const VideoInfo: React.FC<VideoInfoProps> = ({
  caption,
  userName,
  viewCount,
  createdAt,
}) => {
  return (
    <div>
      <Link href="/">
        <div className="flex flex-col  gap-1">
          <p className="flex gap-2 items-center md:text-md font-bold text-primary dark:text-white">
            {caption}
          </p>
          <div className=" flex md:flex-col gap-1">
            <p className="flex gap-1 font-medium text-xs items-center text-primary dark:text-white">
              {userName} {` `}
              <GoVerified className="text-blue-400 text-md" />
            </p>
            <div className="flex flex-row gap-1 ">
              <p className="  text-xsfont-medium text-xs capitalize text-gray-500 dark:text-gray-300 ">
                {viewCount > 1 ? ` ${viewCount} views` : ` ${viewCount} view`}
              </p>
              <span className=" font-medium text-xs capitalize text-gray-500 dark:text-gray-300">
                {" "}
                -{" "}
              </span>
              <p className=" font-medium text-xs capitalize text-gray-500 dark:text-gray-300 ">
                {moment(`${createdAt}`).fromNow()}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VideoInfo;
