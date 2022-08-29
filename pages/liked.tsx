import axios from "axios";

import React, { useRef, useState } from "react";

import { Video } from "../types";
import { BASE_URL } from "../utils";
import useAuthStore from "../store/authStore";

import VideoCard from "../components/VideoCard";
import NoResults from "../components/NoResults";

interface IProps {
  likeVideo: Video[];
}

const Liked = ({ likeVideo }: IProps) => {
  console.log(likeVideo);
  return (
    <div>
      <div className="dark:text-white ml-10 text-2xl font-bold mb-3">
        Your Liked Videos
      </div>
      <div className="flex flex-wrap gap-[15px] videos ">
        {likeVideo.length ? (
          likeVideo.map((video: Video) => (
            <div className=" object-fill xl:w-[32%] lg:w-[45%] md:w-[45%]">
              <VideoCard post={video} key={video._id} />
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
