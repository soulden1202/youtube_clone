import axios from "axios";

import React, { useEffect, useRef, useState } from "react";

import { Video } from "../types";
import { BASE_URL } from "../utils";

import VideoCard from "../components/VideoCard";
import NoResults from "../components/NoResults";
import VideoList from "../components/VideoList";
import useAuthStore from "../store/authStore";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

interface IProps {
  likedVideos: Video[];
}

const Liked = ({ likedVideos }: IProps) => {
  const handleRemoveFromLikedList = async (postId: string) => {};

  const { userProfile }: { userProfile: any } = useAuthStore();
  const router = useRouter();

  const { id } = router.query;

  return (
    <>
      {userProfile && (
        <div className="flex w-full h-full flex-col">
          <div className="flex dark:text-white ml-10 text-2xl font-bold mb-3 items-center justify-center">
            Your Liked Videos
          </div>
          <div className="flex flex-col w-full h-full items-center  gap-[30px] videos  ">
            {likedVideos.length ? (
              likedVideos.map((video: Video) => (
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

export const getServerSideProps = async (context: any) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  let id: string = context.query.id;

  if (!session || session.user.id !== id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const likedVideos = await axios.get(`${BASE_URL}/api/liked/${id}`);

  return {
    props: { likedVideos: likedVideos.data },
  };
};

export default Liked;
