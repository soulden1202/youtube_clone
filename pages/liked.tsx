import axios from "axios";

import React, { useEffect, useRef, useState } from "react";

import { Video } from "../types";
import { BASE_URL } from "../utils";

import VideoCard from "../components/VideoCard";
import NoResults from "../components/NoResults";
import VideoList from "../components/VideoList";
import useAuthStore from "../store/authStore";
import { useRouter } from "next/router";

interface IProps {
  likeVideo: Video[];
}

const Liked = ({ likeVideo }: IProps) => {
  const handleRemoveFromLikedList = async (postId: string) => {};
  const [isUser, setisUser] = useState(false);
  const { userProfile }: { userProfile: any } = useAuthStore();
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    if (id !== userProfile?._id || !userProfile) {
      router.push(`/`);
    } else {
      setisUser(true);
    }
  }, []);

  return (
    <>
      {isUser && (
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
                  <VideoList
                    post={video}
                    isCurrentOnLikedPage={true}
                    handleRemove={handleRemoveFromLikedList}
                  />
                </div>
              ))
            ) : (
              <NoResults text="No videos liked by you" />
            )}
          </div>
        </div>
      )}
    </>
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
