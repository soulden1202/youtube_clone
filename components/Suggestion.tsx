import axios from "axios";
import React, { useRef } from "react";
import { IRecomendation } from "../types";
import { BASE_URL } from "../utils";
import SuggestionCard from "./SuggestionCard";

interface IProps {
  recommendVideos: IRecomendation[];
}

const Sugestion = ({ recommendVideos }: IProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePostClick = (id: string) => {
    axios.patch(`${BASE_URL}/api/post`, id);
  };
  return (
    <div className="bg-white dark:bg-black h-full">
      <div className="lg:w-400 w-full flex flex-col justify-start mb-2 lg:border-l-2 lg:border-t-0 border-t-2 border-gray-100 p-3 gap-5">
        {recommendVideos.map((video: IRecomendation) => (
          <SuggestionCard post={video} key={video._id} />
        ))}
      </div>
    </div>
  );
};

export default Sugestion;
