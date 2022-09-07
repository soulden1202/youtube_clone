import React, { useRef } from "react";
import { Video } from "../types";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import { GoVerified } from "react-icons/go";
import moment from "moment";
import axios from "axios";
import { BASE_URL } from "../utils";

interface IProps {
  post: Video;
}

const VideoCard: NextPage<IProps> = ({ post }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const data = { id: post._id };

  const handlePostClick = () => {
    axios.patch(`${BASE_URL}/api/post`, data);
  };

  return (
    <div className=" flex flex-col">
      <div className="flex flex-col ">
        <div
          className="rounded-3xl object-cover h-full w-full"
          onMouseEnter={() => {
            videoRef?.current?.play();
          }}
          onMouseLeave={() => {
            videoRef?.current?.load();
          }}
        >
          <Link href={`/detail/${post._id}`}>
            <video
              ref={videoRef}
              className="bg-white dark:bg-black flex mx-1 rounded-2xl cursor-pointer h-[200px] w-full md:h-[300px] "
              src={post.uploadVideo.video.asset.url}
              poster={post.uploadVideo.thumbnail.asset.url}
              muted
              onClick={handlePostClick}
            ></video>
          </Link>
          <div className="flex justify-end text-baclk dark:text-white mr-10">
            {videoRef?.current?.duration && (
              <p>
                {Math.floor(videoRef.current.duration / 60).toFixed(0)}:
                {(videoRef.current.duration % 60).toFixed(0)}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="ml-10 mt-3">
        <div className="flex gap-3 cursor-pointer font-semibold rounded">
          <div className="md:w-10 md:h10 w-5 h-5">
            <Link href="/">
              <>
                <Image
                  width={62}
                  height={62}
                  className="rounded-full"
                  src={post.postedBy.image}
                  alt="profile photo"
                ></Image>
              </>
            </Link>
          </div>
          <div>
            <Link href="/">
              <div className="flex flex-col  gap-1">
                <p className="flex gap-2 items-center md:text-md font-bold text-primary dark:text-white">
                  {post.caption}
                </p>
                <div className=" flex md:flex-col gap-1">
                  <p className="flex gap-1 font-medium text-xs items-center text-primary dark:text-white">
                    {post.postedBy.userName} {` `}
                    <GoVerified className="text-blue-400 text-md" />
                  </p>
                  <div className="flex flex-row gap-1 ">
                    <p className="  text-xsfont-medium text-xs capitalize text-gray-500 dark:text-gray-300 ">
                      {post.viewCount > 1
                        ? ` ${post.viewCount} views`
                        : ` ${post.viewCount} view`}
                    </p>
                    <span className=" font-medium text-xs capitalize text-gray-500 dark:text-gray-300">
                      {" "}
                      -{" "}
                    </span>
                    <p className=" font-medium text-xs capitalize text-gray-500 dark:text-gray-300 ">
                      {moment(`${post.createdAt}`).fromNow()}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
