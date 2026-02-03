import { useRef } from "react";
import { useRouter } from "next/router";

export const usePlayListQueue = (index: number, createLink?: (index: number) => any) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  const changeVideo = () => {
    if (createLink) {
      const href = createLink(index);
      router.push(href);
    }
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
