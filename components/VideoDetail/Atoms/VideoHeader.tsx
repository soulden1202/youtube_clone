import React from "react";
import styles from "./VideoHeader.module.css";

interface VideoHeaderProps {
  caption: string;
}

const VideoHeader: React.FC<VideoHeaderProps> = ({ caption }) => {
  return (
    <p className="flex gap-2 items-center md:text-md font-bold text-primary dark:text-white">
      {caption}
    </p>
  );
};

export default VideoHeader;
