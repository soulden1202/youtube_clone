import axios from "axios";

import React from "react";

import { Video } from "../../types";
import { BASE_URL } from "../../utils";

import NoResults from "../../components/NoResults";
import useAuthStore from "../../store/authStore";
import VideoList from "../../components/VideoList";

import Error from "../../components/Error";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

interface IProps {
  playListVideos: Video[];
  error?: string;
  playListName: string;
}

const PlayList = ({ playListVideos, error, playListName }: IProps) => {
  const handleRemoveFromLikedList = async (postId: string) => {};

  const { userProfile }: { userProfile: any } = useAuthStore();

  return (
    <>
      {userProfile && (
        <div className="flex w-full h-full flex-col">
          <div className="flex dark:text-white ml-10 text-2xl font-bold mb-3 items-center justify-center">
            Play List: {playListName}
          </div>
          <div className="flex flex-col w-full h-full items-center  gap-[30px] videos  ">
            {playListVideos && playListVideos.length ? (
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
      },
    };
  } catch (error: any) {
    return {
      props: { error: error.message },
    };
  }
};

export default PlayList;
