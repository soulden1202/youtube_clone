import axios from "axios";

import React, { useRef, useState } from "react";

import { Video } from "../types";
import { BASE_URL } from "../utils";
import useAuthStore from "../store/authStore";

import VideoCard from "../components/VideoCard";
import NoResults from "../components/NoResults";

interface IProps {
  uploaedVideos: Video[];
}

const Uploaded = ({ uploaedVideos }: IProps) => {
  return (
    <div>
      <div className="dark:text-white ml-10 text-2xl font-bold mb-3">
        Video Uploaded By You
      </div>
      <div className="flex flex-wrap gap-[15px] videos ">
        {uploaedVideos.length ? (
          uploaedVideos.map((video: Video) => (
            <div className=" object-fill xl:w-[32%] lg:w-[45%] md:w-[45%]">
              <VideoCard post={video} key={video._id} />
            </div>
          ))
        ) : (
          <NoResults text="You didn't upload any video yet" />
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = async (context: {
  query: { id: string };
}) => {
  let id: string = context.query.id;
  const uploaedVideos = await axios.get(`${BASE_URL}/api/uploaded/${id}`);

  return {
    props: { uploaedVideos: uploaedVideos.data },
  };
};

export default Uploaded;
