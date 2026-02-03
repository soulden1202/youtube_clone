import { useRef } from "react";
import { useRouter } from "next/router";

export const useSuggestionCard = (postId: string) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  const changeVideo = () => {
    router.push(`/detail/${postId}`);
  };

  const handleMouseEnter = () => videoRef?.current?.play();
  const handleMouseLeave = () => videoRef?.current?.load();

  return {
    videoRef,
    changeVideo,
    handleMouseEnter,
    handleMouseLeave,
  };
};
