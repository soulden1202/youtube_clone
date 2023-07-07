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
import Error from "../components/Error";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IProps {
  likedVideos: Video[];
  error?: string;
}

const Liked = ({ likedVideos, error }: IProps) => {
  const handlePlayListUpdate = async (
    videoId: string,
    playListName: any,
    playListId: any,
    isAdding: any,
    userId: any
  ) => {
    let s1 = `Adding video to ${playListName}`;

    if (!isAdding) {
      s1 = `Removing video from ${playListName}`;
    }

    const id = toast.loading(s1, {
      position: "bottom-right",

      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      isLoading: true,
    });

    const data = {
      userId: userId,
      isAdding: isAdding,
      videoId: videoId,
    };
    await axios
      .patch(`${BASE_URL}/api/list/${playListId}`, data)
      .then((response) => {
        toast.update(id, {
          render: "Successfully",
          type: "success",
          isLoading: false,
          autoClose: 5000,
          hideProgressBar: true,
        });
      })
      .catch((error) => {
        toast.update(id, {
          render: error.message,
          type: "error",
          isLoading: false,
          autoClose: 5000,
          hideProgressBar: true,
        });
      });
  };

  const { userProfile }: { userProfile: any } = useAuthStore();
  const router = useRouter();

  const { id } = router.query;

  return (
    <>
      {userProfile && !error && (
        <div className="flex w-full h-full flex-col">
          <ToastContainer />
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
                    fromPage={"Liked"}
                    handlePlayListUpdate={handlePlayListUpdate}
                  />
                </div>
              ))
            ) : (
              <NoResults text="No videos liked by you" />
            )}
          </div>
        </div>
      )}
      {error && (
        <div className="flex w-full h-full flex-col">
          <Error text={`${error}`} />
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

  try {
    const likedVideos = await axios.get(`${BASE_URL}/api/liked/${id}`, {
      headers: {
        cookie: context.req.headers.cookie || "",
      },
    });

    return {
      props: { likedVideos: likedVideos.data },
    };
  } catch (error: any) {
    return {
      props: { error: error.message },
    };
  }
};

export default Liked;
