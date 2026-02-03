import React from "react";
import { NextPage } from "next";
import { Video } from "../../types";
import VideoPlayer from "./Atoms/VideoPlayer";
import VideoAvatar from "./Atoms/VideoAvatar";
import VideoInfo from "./Atoms/VideoInfo";
import { useVideoCard } from "./Hooks/useVideoCard";
import styles from "./VideoCard.module.css";

interface IProps {
  post: Video;
}

const VideoCard: NextPage<IProps> = ({ post }) => {
  const { videoRef, handlePostClick, handleMouseEnter, handleMouseLeave } =
    useVideoCard(post._id);

    console.log(post)

  return (
    <div className={styles.videoContainer}>
      <div className="flex flex-col ">
        <VideoPlayer
          videoRef={videoRef}
          src={typeof post.uploadVideo.video.asset.url === "string" ? post.uploadVideo.video.asset.url : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"}
          poster={typeof post.uploadVideo.thumbnail.asset.url === "string" ? post.uploadVideo.thumbnail.asset.url : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"}
          onClick={handlePostClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          detailUrl={`/detail/${post._id}`}
        />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.userSection}>
          <VideoAvatar image={post.postedBy.image} />
          <VideoInfo
            caption={post.caption}
            userName={post.postedBy.userName}
            viewCount={post.viewCount}
            createdAt={post.createdAt}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
