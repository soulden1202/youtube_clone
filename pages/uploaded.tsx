import axios from "axios";

import React, { useEffect, useState } from "react";

import { Video } from "../types";
import { BASE_URL } from "../utils";

import VideoCard from "../components/VideoCard";
import NoResults from "../components/NoResults";
import VideoList from "../components/VideoList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthStore from "../store/authStore";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { request } from "http";

interface IProps {
  uploaedVideos: Video[];
}

const Uploaded = ({ uploaedVideos }: IProps) => {
  const [videos, setVideos] = useState(uploaedVideos);
  const { userProfile }: { userProfile: any } = useAuthStore();

  const handleDeleteVideoFromAccount = async (postId: string) => {
    const id = toast.loading("Deleting your video", {
      position: "bottom-right",

      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      isLoading: true,
    });
    await axios
      .delete(`${BASE_URL}/api/post`, {
        data: { id: postId },
      })
      .then((response) => {
        toast.update(id, {
          render: "Your video has been deleted",
          type: "success",
          isLoading: false,
          autoClose: 5000,
          hideProgressBar: true,
        });
        setVideos(videos.filter((video) => video._id !== postId));
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

  function timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  return (
    <>
      {userProfile && (
        <div className="flex w-full h-full flex-col">
          <ToastContainer />
          <div className="flex dark:text-white ml-10 text-2xl font-bold mb-3 items-center justify-center">
            Video Uploaded By You
          </div>
          <div className="flex flex-col w-full h-full items-center  gap-[30px] videos ">
            {videos.length ? (
              videos.map((video: Video) => (
                <div
                  className="flex w-[90%] md:w-[70%] h-[50%] md:h-[20%]"
                  key={video._id}
                >
                  <VideoList
                    post={video}
                    isCurrentOnLikedPage={false}
                    handleRemove={handleDeleteVideoFromAccount}
                  />
                </div>
              ))
            ) : (
              <NoResults text="You didn't upload any video yet" />
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
  } else {
    const uploaedVideos = await axios.get(`${BASE_URL}/api/uploaded/${id}`);

    return {
      props: { uploaedVideos: uploaedVideos.data },
    };
  }
};

export default Uploaded;
