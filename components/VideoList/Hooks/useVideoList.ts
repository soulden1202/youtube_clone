import { useState, useEffect } from "react";
import { uuid } from "uuidv4";
import axios from "axios";
import { BASE_URL } from "../../../utils";

export const useVideoList = (
  post: any,
  playLists: any,
  userProfile: any,
  addPlayList: any,
  addVideoToPlayList: any,
  removeVideoFromPlayList: any,
  handlePlayListUpdate?: any
) => {
  const [newplayListName, setnewPlayListName] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const check = playLists.some((p: any) => p.playListName === newplayListName);
    setDisabled(newplayListName.length <= 0 || check);
  }, [newplayListName, playLists]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const createPlayList = async (e: any) => {
    e.preventDefault();
    const key = uuid();
    const newPlayList = {
      playListName: newplayListName,
      _key: key,
      videos: [],
    };

    const data = {
      playListName: newplayListName,
      _key: key,
      videoId: post._id,
    };

    try {
      await axios.post(`${BASE_URL}/api/playLists/${userProfile.id}`, data);
      addPlayList(newPlayList, playLists);
      setnewPlayListName("");

      if (handlePlayListUpdate) {
        await handlePlayListUpdate(post._id, newplayListName, key, true, userProfile.id);
        addVideoToPlayList(post._id, newplayListName, playLists);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const onCheckBoxChange = async (e: any, playListId: any, videoId: any, playListName: any) => {
    if (e.target.checked && handlePlayListUpdate) {
      await handlePlayListUpdate(videoId, playListName, playListId, true, userProfile.id);
      addVideoToPlayList(videoId, playListName, playLists);
    } else if (!e.target.checked && handlePlayListUpdate) {
      await handlePlayListUpdate(videoId, playListName, playListId, false, userProfile.id);
      removeVideoFromPlayList(videoId, playListName, playLists);
    }
  };

  return {
    newplayListName,
    setnewPlayListName,
    disabled,
    isOpen,
    openModal,
    closeModal,
    createPlayList,
    onCheckBoxChange,
  };
};
