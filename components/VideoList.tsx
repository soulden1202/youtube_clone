import React, { useRef } from "react";
import { Video } from "../types";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import { BiDotsVerticalRounded } from "react-icons/bi";
import moment from "moment";
import axios from "axios";
import { BASE_URL } from "../utils";
import Dropdown from "rc-dropdown";
import Menu, { Item as MenuItem, Divider } from "rc-menu";
import "rc-dropdown/assets/index.css";
import { useRouter } from "next/router";

interface IProps {
  post: Video;
  isCurrentOnLikedPage: boolean;
  handleRemove: (postId: string) => Promise<void>;
}

const VideoList: NextPage<IProps> = ({
  post,
  isCurrentOnLikedPage,
  handleRemove,
}) => {
  const router = useRouter();
  const dotMenuForUploadedPage = (
    <Menu onSelect={onSelect} className="w-[100px] h-[50px]">
      <MenuItem
        className="h-[25px] cursor-pointer hover:bg-blue-300 justify-center text-center mt-2 flex items-center "
        key="edit"
      >
        Edit
      </MenuItem>
      <Divider />
      <MenuItem
        key="delete"
        className="flex cursor-pointer h-[25px]  hover:bg-blue-300 justify-center items-center text-center mt-2 px-2 py-2"
      >
        Delete
      </MenuItem>
    </Menu>
  );

  const dotMenuForLikedPage = (
    <Menu onSelect={onSelect} className="h-[50px]">
      <MenuItem
        className="h-[25px] cursor-pointer hover:bg-blue-300 justify-center text-center mt-2 flex items-center "
        key="remove"
      >
        Remove from liked
      </MenuItem>
      <Divider />
      <MenuItem
        key="playlist"
        className="flex cursor-pointer h-[25px]  hover:bg-blue-300 justify-center items-center text-center mt-2 px-2 py-2"
      >
        Add to playlist
      </MenuItem>
    </Menu>
  );

  const data = { id: post._id };

  const handlePostClick = () => {
    axios.patch(`${BASE_URL}/api/post`, data);
  };

  async function onSelect(info: any) {
    if (info.key == "edit") {
      router.push({
        pathname: "/edit",
        query: {
          id: post.userId,
          postId: post._id,
          caption: post.caption,
          description: post.description,
          tags: post.tags,
        },
      });
    } else if (info.key == "delete") {
      //this function can be called if we are currently on uploaded videos page
      handleRemove(data.id);
    }
  }

  return (
    <div className=" flex flex-row h-full w-full border-gray-500 border-2 rounded-sm hover:border-blue-400">
      <div className="flex flex-row h-full w-[30%] lg:w-[30%]">
        <div className="flex rounded-3xl object-cover h-full  ">
          <Link href={`/detail/${post._id}`}>
            <img
              className="bg-white dark:bg-black flex mx-1  cursor-pointer h-full "
              src={post.uploadVideo.thumbnail.asset.url}
              onClick={handlePostClick}
            ></img>
          </Link>
        </div>
      </div>
      <div className="flex flex-row w-full justify-between ml-2">
        <div className="flex gap-3 cursor-pointer font-semibold rounded">
          <div>
            <Link href={`/detail/${post._id}`}>
              <div className="flex flex-col  gap-1">
                <p className="flex gap-2 items-center md:text-md font-bold text-primary dark:text-white dark:hover:text-blue-400 hover:text-blue-400">
                  {post.caption}
                </p>
                <div className=" flex md:flex-col gap-1">
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
        <div className="h-full mr-2">
          <Dropdown
            trigger={["click"]}
            overlay={
              isCurrentOnLikedPage
                ? dotMenuForLikedPage
                : dotMenuForUploadedPage
            }
            animation="slide-up"
          >
            <button className="h-[20px] w-[20px] mt-2">
              <BiDotsVerticalRounded className="h-full w-full dark:text-white dark:hover:text-blue-500 hover:text-blue-500"></BiDotsVerticalRounded>
            </button>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default VideoList;
