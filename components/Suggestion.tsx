import axios from "axios";
import React, { useRef } from "react";
import { IRecomendation } from "../types";
import { BASE_URL } from "../utils";
import SuggestionCard from "./SuggestionCard";

interface IProps {
  recommendVideos: IRecomendation[];
}

const Sugestion = ({ recommendVideos }: IProps) => {
  return (
    <div className="bg-white w-full flex dark:bg-black h-full">
      <div className=" w-full h-full flex flex-col justify-start mb-2 lg:border-l-2 lg:border-t-0 border-t-2 border-gray-100 p-3 gap-5">
        {recommendVideos.map((video: IRecomendation) => (
          <SuggestionCard post={video} key={video._id} />
        ))}
      </div>
    </div>
  );
};

export default Sugestion;
