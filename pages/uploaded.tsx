import axios from "axios";

import React from "react";

import { Video } from "../types";
import { BASE_URL } from "../utils";

import VideoCard from "../components/VideoCard";
import NoResults from "../components/NoResults";
import VideoList from "../components/VideoList";

interface IProps {
  uploaedVideos: Video[];
}

const Uploaded = ({ uploaedVideos }: IProps) => {
  return (
    <div className="flex w-full h-full flex-col">
      <div className="flex dark:text-white ml-10 text-2xl font-bold mb-3 items-center justify-center">
        Video Uploaded By You
      </div>
      <div className="flex flex-col w-full h-full items-center  gap-[30px] videos ">
        {uploaedVideos.length ? (
          uploaedVideos.map((video: Video) => (
            <div
              className="flex w-[90%] md:w-[70%] h-[50%] md:h-[20%]"
              key={video._id}
            >
              <VideoList post={video} isLiked={false} />
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
