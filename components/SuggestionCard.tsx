import React, { useState, useEffect, useRef } from "react";
import { IRecomendation, Video } from "../types";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import moment from "moment";
import axios from "axios";
import { useRouter } from "next/router";
import { BASE_URL } from "../utils";

interface IProps {
  post: IRecomendation;
}

const VideoCard: NextPage<IProps> = ({ post }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const data = { id: post._id };
  const router = useRouter();

  const changeVideo = () => {};

  return (
    <div className="flex flex-row hover:bg-gray-700 rounded-sm">
      <div className="flex flex-col object-cover w-[50%]">
        <div
          className="rounded-3xl object-cover h-full w-full"
          onMouseEnter={() => {
            videoRef?.current?.play();
          }}
          onMouseLeave={() => {
            videoRef?.current?.load();
          }}
        >
          <video
            ref={videoRef}
            className="bg-white dark:bg-black flex mx-1 rounded-2xl w-full h-[100px] border-2 border-gray-500"
            src={post.uploadVideo.video.asset.url}
            poster={post.uploadVideo.thumbnail.asset.url}
            muted
          ></video>

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
      <div className="mt-1 ml-3 w-[50%]" onClick={changeVideo}>
        <div className="flex gap-3 cursor-pointer font-semibold rounded">
          <div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
