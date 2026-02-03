import React from "react";
import { Video } from "../../types";
import { NextPage } from "next";
import Link from "next/link";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import moment from "moment";
import Dropdown from "rc-dropdown";
import Menu, { SubMenu, Item as MenuItem, Divider } from "rc-menu";
import "rc-dropdown/assets/index.css";
import "rc-menu/assets/index.css";
import { useRouter } from "next/router";
import Modal from "react-modal";
import usePlayListStore from "../../store/playListStore";
import Checkbox from "rc-checkbox";
import "rc-checkbox/assets/index.css";
import useAuthStore from "../../store/authStore";
import { useVideoList } from "./Hooks/useVideoList";

interface IProps {
  post: Video;
  fromPage: string;
  playListName?: string;
  handleRemove?: (postId: string) => Promise<void>;
  handlePlayListUpdate?: (
    videoId: string,
    playListName: any,
    playListId: any,
    isAdding: any,
    userId: any
  ) => Promise<void>;
  handleRemoveFromLikedList?: (
    userId: string,
    videoId: string
  ) => Promise<void>;
  handleRemoveFromCurrentPlayList?: (
    userId: string,
    videoId: string
  ) => Promise<void>;
}

const VideoList: NextPage<IProps> = ({
  post,
  fromPage,
  handleRemove,
  handlePlayListUpdate,
  handleRemoveFromLikedList,
  playListName,
  handleRemoveFromCurrentPlayList,
}) => {
  const {
    playLists,
    addVideoToPlayList,
    removeVideoFromPlayList,
    addPlayList,
  }: any = usePlayListStore();

  const { userProfile }: { userProfile: any } = useAuthStore();

  const {
    newplayListName,
    setnewPlayListName,
    disabled,
    isOpen,
    openModal,
    closeModal,
    createPlayList,
    onCheckBoxChange,
  } = useVideoList(
    post,
    playLists,
    userProfile,
    addPlayList,
    addVideoToPlayList,
    removeVideoFromPlayList,
    handlePlayListUpdate
  );

  const router = useRouter();

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

  const onSelect = (info: any) => {
    if (info.key === "edit") {
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
    } else if (info.key === "delete") {
      if (handleRemove) handleRemove(post._id);
    } else if (info.key === "removeLiked") {
      if (handleRemoveFromLikedList) handleRemoveFromLikedList(userProfile.id, post._id);
    } else if (info.key === "removeFromList") {
      if (handleRemoveFromCurrentPlayList) {
        handleRemoveFromCurrentPlayList(userProfile.id, post._id);
        removeVideoFromPlayList(post._id, playListName, playLists);
      }
    }
  };

  const dotMenuForUploadedPage = (
    <Menu onSelect={onSelect} className="w-[100px] h-[50px]">
      <MenuItem className="h-[25px] cursor-pointer hover:bg-blue-300 justify-center text-center mt-2 flex items-center " key="edit">
        Edit
      </MenuItem>
      <Divider />
      <MenuItem key="delete" className="flex cursor-pointer h-[25px] hover:bg-blue-300 justify-center items-center text-center mt-2 px-2 py-2">
        Delete
      </MenuItem>
    </Menu>
  );

  const dotMenuForLikedPage = (
    <Menu onSelect={onSelect} className="w-[130px] h-[100px]">
      <MenuItem className="h-[25px] cursor-pointer hover:bg-blue-300 justify-center text-center mt-2 flex items-center " key="removeLiked">
        Remove
      </MenuItem>
      <Divider />
      <Divider />
      <SubMenu key="1" title="Add to playlist">
        {playLists.map((playList: any) => (
          <MenuItem className="" key={`${playList._key}`}>
            <Checkbox
              name={playList.playListName}
              defaultChecked={playList.videos.some((v: any) => v._id === post._id)}
              onChange={(e: any) => onCheckBoxChange(e, playList._key, post._id, playList.playListName)}
            />
            &nbsp;&nbsp;{playList.playListName}
          </MenuItem>
        ))}
        <MenuItem className="flex cursor-pointer justify-center items-center" key="add" onClick={openModal}>
          <AiOutlinePlus />
        </MenuItem>
      </SubMenu>
    </Menu>
  );

  const dotMenuForPlayListPage = (
    <Menu onSelect={onSelect} className="w-[130px] h-[100px]">
      <MenuItem className="h-[25px] cursor-pointer hover:bg-blue-300 justify-center text-center mt-2 flex items-center " key="removeFromList">
        Remove
      </MenuItem>
      <Divider />
      <Divider />
      <SubMenu key="1" title="Add to playlist">
        {playLists.map((playList: any) => 
          playListName !== playList.playListName && (
            <MenuItem className="" key={`${playList._key}`}>
              <Checkbox
                name={playList.playListName}
                defaultChecked={playList.videos.some((v: any) => v._id === post._id)}
                onChange={(e: any) => onCheckBoxChange(e, playList._key, post._id, playList.playListName)}
              />
              &nbsp;&nbsp;{playList.playListName}
            </MenuItem>
          )
        )}
        <MenuItem className="flex cursor-pointer justify-center items-center" key="add" onClick={openModal}>
          <AiOutlinePlus />
        </MenuItem>
      </SubMenu>
    </Menu>
  );

  return (
    <div className=" flex flex-row h-full w-full border-gray-500 border-2 rounded-sm hover:border-blue-400">
      <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
        <div className="flex flex-col ">
          <h2 className="">Create new play list</h2>
          <form onSubmit={createPlayList} className="flex flex-col gap-4 mt-2">
            <input
              type="text"
              className="dark:text-white dark:bg-black w-full outline-0 border-b border-gray-500 dark:focus:border-white focus:border-black"
              value={newplayListName}
              onChange={(e) => setnewPlayListName(e.target.value)}
              placeholder="Play list name"
            />
            <div className="flex flex-row justify-end gap-4 mt-3">
              <button onClick={() => { setnewPlayListName(""); closeModal(); }} className=" text-gray-500">
                Cancel
              </button>
              <button className="disabled:bg-gray-500 border-1 p-2 rounded bg-blue-500 dark:text-white" type="submit" disabled={disabled}>
                Create
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <div className="flex flex-row h-full w-[30%] lg:w-[30%]">
        <div className="flex rounded-3xl object-cover h-full  ">
          <Link href={`/detail/${post._id}`}>
            <img className="bg-white dark:bg-black flex mx-1  cursor-pointer h-full " src={post.uploadVideo.thumbnail.asset.url} alt="thumbnail" />
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
                      {post.viewCount > 1 ? ` ${post.viewCount} views` : ` ${post.viewCount} view`}
                    </p>
                    <span className=" font-medium text-xs capitalize text-gray-500 dark:text-gray-300"> - </span>
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
              fromPage === "Liked" ? dotMenuForLikedPage : fromPage === "Uploaded" ? dotMenuForUploadedPage : dotMenuForPlayListPage
            }
            animation="slide-up"
          >
            <button className="h-[20px] w-[20px] mt-2">
              <BiDotsVerticalRounded className="h-full w-full dark:text-white dark:hover:text-blue-500 hover:text-blue-500" />
            </button>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default VideoList;
