import React, { useRef } from "react";
import { IRecomendation } from "../../types/index";
import { NextPage } from "next";
import { GoVerified } from "react-icons/go";
import moment from "moment";
import { useSuggestionCard } from "./Hooks/useSuggestionCard";

interface IProps {
  post: IRecomendation;
}

const SuggestionCard: NextPage<IProps> = ({ post }) => {
  const { videoRef, changeVideo, handleMouseEnter, handleMouseLeave } = useSuggestionCard(post._id);

  return (
    <div
      onClick={changeVideo}
      className="flex flex-row justify-between w-full cursor-pointer  hover:bg-gray-700 rounded-sm"
    >
      <div className="flex flex-row lg:w-[50%] w-[30%] ">
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

          <div className="flex justify-start text-baclk dark:text-white ml-3">
            {videoRef?.current?.duration && (
              <p>
                {Math.floor(videoRef.current.duration / 60).toFixed(0)}:
                {(videoRef.current.duration % 60).toFixed(0)}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col ml-4 lg:w-[45%] w-[70%]  gap-1 ">
        <p className="flex gap-2 items-center md:text-md font-bold text-primary dark:text-white">
          {post.caption.length >= 70
            ? `${post.caption.substring(0, 70)}...`
            : post.caption}
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

export default SuggestionCard;
