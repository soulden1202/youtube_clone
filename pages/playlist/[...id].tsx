import axios from "axios";

import React, { useEffect, useState } from "react";

import { Video } from "../../types";
import { BASE_URL } from "../../utils";

import NoResults from "../../components/NoResults";
import useAuthStore from "../../store/authStore";
import VideoList from "../../components/VideoList";

import Error from "../../components/Error";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IProps {
  playListVideos: Video[];
  error?: string;
  playListName: string;
  playListId: string;
}

const PlayList = ({
  playListVideos,
  error,
  playListName,
  playListId,
}: IProps) => {
  const [videos, setvideos] = useState(playListVideos);
  useEffect(() => {
    setvideos(playListVideos);
  }, [playListVideos]);

  const handleRemoveFromCurrentPlayList = async (
    userId: any,
    videoId: string
  ) => {
    const id = toast.loading(`Removing from ${playListName}`, {
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
      isAdding: false,
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
        setvideos(videos.filter((v: any) => v._id !== videoId));
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

  return (
    <>
      {userProfile && (
        <div className="flex w-full h-full flex-col">
          <ToastContainer />
          <div className="flex dark:text-white ml-10 text-2xl font-bold mb-3 items-center justify-center">
            Play List: {playListName}
          </div>
          <div className="flex flex-col w-full h-full items-center  gap-[30px] videos  ">
            {videos && videos.length ? (
              videos.map((video: Video) => (
                <div
                  className="flex w-[90%] md:w-[70%] h-[50%] md:h-[20%]"
                  key={video._id}
                >
                  <VideoList
                    post={video}
                    fromPage={"PlayList"}
                    handleRemoveFromCurrentPlayList={
                      handleRemoveFromCurrentPlayList
                    }
                    playListName={playListName}
                    handlePlayListUpdate={handlePlayListUpdate}
                  />
                </div>
              ))
            ) : (
              <NoResults text="Play List is Empty" />
            )}
          </div>
        </div>
      )}

      {error && error?.length > 0 && !playListVideos && (
        <div className="flex w-full h-full flex-col">
          <Error text={`${error}`} />
        </div>
      )}
    </>
  );
};

export const getServerSideProps = async (context: any) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  let userId: string = context.query.id[0];
  let playListId: string = context.query.id[1];

  if (!session || session.user.id !== userId) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const data = {
    userId: userId,
  };

  try {
    const playListVideos = await axios.post(
      `${BASE_URL}/api/list/${playListId}`,
      data,
      {
        headers: {
          cookie: context.req.headers.cookie || "",
        },
      }
    );

    return {
      props: {
        playListVideos: playListVideos.data[0].videos || null,
        playListName: playListVideos.data[0].playListName || null,
        playListId: playListVideos.data[0]._key || null,
      },
    };
  } catch (error: any) {
    return {
      props: { error: error.message },
    };
  }
};

export default PlayList;
