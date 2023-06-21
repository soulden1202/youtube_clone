import axios from "axios";

import React, { useRef, useState } from "react";

import { Video } from "../types";
import { BASE_URL } from "../utils";

import VideoCard from "../components/VideoCard";
import NoResults from "../components/NoResults";
import VideoList from "../components/VideoList";

interface IProps {
  likeVideo: Video[];
}

const Liked = ({ likeVideo }: IProps) => {
  return (
    <div className="flex w-full h-full flex-col">
      <div className="flex dark:text-white ml-10 text-2xl font-bold mb-3 items-center justify-center">
        Your Liked Videos
      </div>
      <div className="flex flex-col w-full h-full items-center  gap-[30px] videos  ">
        {likeVideo.length ? (
          likeVideo.map((video: Video) => (
            <div
              className="flex w-[90%] md:w-[70%] h-[50%] md:h-[20%]"
              key={video._id}
            >
              <VideoList post={video} isLiked={true} />
            </div>
          ))
        ) : (
          <NoResults text="No videos liked by you" />
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = async (context: {
  query: { id: string };
}) => {
  let id: string = context.query.id;
  const likeVideo = await axios.get(`${BASE_URL}/api/liked/${id}`);

  return {
    props: { likeVideo: likeVideo.data },
  };
};

export default Liked;
