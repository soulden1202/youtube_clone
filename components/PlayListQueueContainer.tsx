import React from "react";
import { IPlayListQueue, IRecomendation } from "../types";
import PlayListQueue from "./PlayListQueue";
import useAuthStore from "../store/authStore";

interface IProps {
  key?: string;
  playListId?: string;
  currentIndex?: number;
  playListQueue?: IPlayListQueue;
}

const PlayListQueueContainer = ({
  key,
  playListId,
  currentIndex,
  playListQueue,
}: IProps) => {
  const { userProfile }: { userProfile: any } = useAuthStore();

  const createLink = (index: number) => {
    const video = playListQueue?.videos[index];

    const href = {
      pathname: `/detail/${video?._id}`,
      query: {
        playList: playListId,
        index: index,
        userId: userProfile.id,
      },
    };

    return href;
  };

  console.log(currentIndex);
  return (
    <div className="bg-gray-500 w-full flex-col flex max-h-[900px ] rounded-xl overflow-auto">
      <div className="dark:text-white font-bold flex w-full items-center justify-center text-lg">
        <span>Playing: &nbsp;</span>
        {playListQueue?.playListName}
      </div>
      <div className=" w-full h-full flex flex-col justify-start mb-2 lg:border-l-2 lg:border-t-0 border-t-2 border-gray-100 p-3 gap-5">
        {playListQueue?.videos.map((video: IRecomendation) => (
          <PlayListQueue
            post={video}
            key={playListQueue._key}
            index={playListQueue.videos.findIndex(
              (v: IRecomendation) => v._id === video._id
            )}
            playListId={playListId ? playListId : ""}
            currentIndex={currentIndex ? currentIndex : 0}
            createLink={createLink}
          />
        ))}
      </div>
    </div>
  );
};

export default PlayListQueueContainer;
