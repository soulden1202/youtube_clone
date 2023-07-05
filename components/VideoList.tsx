import React, { useEffect, useRef, useState } from "react";
import { Video } from "../types";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import { BiDotsVerticalRounded } from "react-icons/bi";
import moment from "moment";
import axios from "axios";
import { BASE_URL } from "../utils";
import Dropdown from "rc-dropdown";
import Menu, { SubMenu, Item as MenuItem, Divider } from "rc-menu";
import "rc-dropdown/assets/index.css";
import "rc-menu/assets/index.css";
import { useRouter } from "next/router";
import Modal from "react-modal";

interface IProps {
  post: Video;
  fromPage: string;
  handleRemove: (postId: string) => Promise<void>;
}

const VideoList: NextPage<IProps> = ({ post, fromPage, handleRemove }) => {
  const [dummy, setdummy] = useState([
    { name: "test1", inplay: true },
    { name: "test2", inplay: true },
  ]);

  const [playListName, setplayListName] = useState("");
  const [disabled, setDisabled] = useState(true);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const check = dummy.some((data) => data.name === playListName);
    if (playListName.length <= 0 || check) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [playListName]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const createPlayList = (e: any) => {
    const newPlayList = { name: playListName, inplay: false };

    setdummy([...dummy, newPlayList]);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

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
    <Menu onSelect={onSelect} className="w-[120px] h-[100px]">
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
      <Divider />
      <SubMenu key="1" title="let me check">
        {dummy.map((item) => (
          <MenuItem className="cursor-pointer" key={`${item.name}`}>
            {item.name}
          </MenuItem>
        ))}
        <MenuItem className="cursor-pointer" key="add" onClick={openModal}>
          +
        </MenuItem>
      </SubMenu>
    </Menu>
  );

  const dotMenuForPlayListPage = (
    <Menu onSelect={onSelect} className="w-[120px] h-[100px]">
      <MenuItem
        className="h-[25px] cursor-pointer hover:bg-blue-300 justify-center text-center mt-2 flex items-center "
        key="remove"
      >
        Remove from liked
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
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex flex-col ">
          <h2 className="">Create new play list</h2>
          <form
            onSubmit={(e) => {
              createPlayList(e);
            }}
            className="flex flex-col gap-4 mt-2"
          >
            <input
              type="text"
              id="input"
              className="dark:text-white dark:bg-black w-full outline-0 border-b border-gray-500 dark:focus:border-white focus:border-black"
              value={playListName}
              onChange={(e) => {
                setplayListName(e.target.value);
              }}
              placeholder="Play list name"
            />

            <div className="flex flex-row justify-end gap-4 mt-3">
              <button
                onClick={() => {
                  setplayListName("");
                  closeModal();
                }}
                className=" text-gray-500"
              >
                Cancel
              </button>
              <button
                className="disabled:bg-gray-500 border-1 p-2 rounded bg-blue-500 dark:text-white"
                onClick={(e) => {
                  createPlayList(e);
                  setplayListName("");
                  closeModal();
                }}
                disabled={disabled}
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </Modal>
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
              fromPage == "Liked"
                ? dotMenuForLikedPage
                : fromPage == "Uploaded"
                ? dotMenuForUploadedPage
                : dotMenuForPlayListPage
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
