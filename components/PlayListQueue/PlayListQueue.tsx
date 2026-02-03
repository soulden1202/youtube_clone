import React from "react";
import { IRecomendation } from "../../types/index";
import { GoVerified } from "react-icons/go";
import moment from "moment";
import { usePlayListQueue } from "./Hooks/usePlayListQueue";

interface IProps {
  post: IRecomendation;
  playListId: string;
  index: number;
  currentIndex: number;
  createLink?: (index: number) => any;
}

const PlayListQueue = ({
  currentIndex,
  index,
  post,
  createLink,
}: IProps) => {
  const { videoRef, changeVideo, handleMouseEnter, handleMouseLeave } = usePlayListQueue(index, createLink);

  return (
    <div
      className={`flex flex-row justify-between w-full p-2 ${
        currentIndex === index ? `bg-gray-700` : `bg-gray-600`
      }  hover:bg-gray-800 rounded-lg cursor-pointer`}
      onClick={changeVideo}
    >
      <div className="flex items-center justify-center">
        {currentIndex == index ? <div>P {index}</div> : <div>{index}</div>}
      </div>
      <div className="flex flex-row lg:w-[45%] w-[28%] ">
        <div
          className="rounded-3xl object-cover h-full w-full"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <video
            ref={videoRef}
            className="bg-white dark:bg-black flex mx-1 rounded-2xl  border-2 border-gray-500"
            src={post.uploadVideo.video.asset.url}
            poster={post.uploadVideo.thumbnail.asset.url}
            muted
          />
        </div>
      </div>

      <div className="flex flex-col ml-4 lg:w-[45%] w-[70%]  gap-1 ">
        <p className=" hover:text-blue-500 dark:hover:text-blue-500 flex gap-2 items-center md:text-md font-bold text-primary dark:text-white cursor-pointer">
          {post.caption.length >= 70 ? `${post.caption.substring(0, 70)}...` : post.caption}
        </p>
        <div className=" flex md:flex-col gap-1">
          <p className="flex gap-1 font-medium text-xs items-center text-primary dark:text-white">
            {post.postedBy.userName} {` `}
            <GoVerified className="text-blue-400 text-md" />
          </p>
          <div className="flex flex-row gap-1 ">
            <p className="  text-xsfont-medium text-xs capitalize text-gray-500 dark:text-gray-300 ">
              {post.viewCount > 1 ? ` ${post.viewCount} views` : ` ${post.viewCount} view`}
            </p>
            <span className=" font-medium text-xs capitalize text-gray-500 dark:text-gray-300"> - </span>
            <p className=" font-medium text-xs capitalize text-gray-500 dark:text-gray-300 ">
              {moment(`${post.createdAt}`).fromNow()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayListQueue;
