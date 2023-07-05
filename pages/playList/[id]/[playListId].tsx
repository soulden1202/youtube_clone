import axios from "axios";

import React, { useEffect, useRef, useState } from "react";

import { Video } from "../../../types";
import { BASE_URL } from "../../../utils";

import NoResults from "../../../components/NoResults";
import useAuthStore from "../../../store/authStore";
import VideoList from "../../../components/VideoList";

import { useRouter } from "next/router";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]";

interface IProps {
  playListVideos: Video[];
}

const Liked = ({ playListVideos }: IProps) => {
  const handleRemoveFromLikedList = async (postId: string) => {};

  const { userProfile }: { userProfile: any } = useAuthStore();

  return (
    <>
      {userProfile && (
        <div className="flex w-full h-full flex-col">
          <div className="flex dark:text-white ml-10 text-2xl font-bold mb-3 items-center justify-center">
            Your Liked Videos
          </div>
          <div className="flex flex-col w-full h-full items-center  gap-[30px] videos  ">
            {playListVideos.length ? (
              playListVideos.map((video: Video) => (
                <div
                  className="flex w-[90%] md:w-[70%] h-[50%] md:h-[20%]"
                  key={video._id}
                >
                  <VideoList
                    post={video}
                    fromPage={"PlayList"}
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

  let userId: string = context.query.id;
  let playListId: string = context.query.playListId;

  if (!session || session.user.id !== userId) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const playListVideos = await axios.get(
    `${BASE_URL}/api/getPlayList/${userId}/${playListId}`
  );

  return {
    props: { playListVideos: playListVideos.data[0].videos },
  };
};

export default Liked;
