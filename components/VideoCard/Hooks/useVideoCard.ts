import { useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../../../utils";

export const useVideoCard = (postId: string) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePostClick = () => {
    axios.patch(`${BASE_URL}/api/post`, { id: postId });
  };

  const handleMouseEnter = () => {
    videoRef?.current?.play();
  };

  const handleMouseLeave = () => {
    videoRef?.current?.load();
  };

  return {
    videoRef,
    handlePostClick,
    handleMouseEnter,
    handleMouseLeave,
  };
};
