import React from "react";
import Link from "next/link";

interface VideoPlayerProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  src: string;
  poster: string;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  detailUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoRef,
  src,
  poster,
  onClick,
  onMouseEnter,
  onMouseLeave,
  detailUrl,
}) => {
  return (
    <div
      className="rounded-3xl object-cover h-full w-full"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Link href={detailUrl}>
        <video
          ref={videoRef}
          className="bg-white dark:bg-black flex mx-1 rounded-2xl cursor-pointer h-[200px] w-full md:h-[300px] "
          src={src}
          poster={poster}
          muted
          onClick={onClick}
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
  );
};

export default VideoPlayer;
