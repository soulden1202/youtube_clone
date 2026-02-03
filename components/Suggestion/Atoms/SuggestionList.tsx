import React from "react";
import { IRecomendation } from "../../../types";
import SuggestionCard from "../../SuggestionCard";

interface SuggestionListProps {
  recommendVideos: IRecomendation[];
}

const SuggestionList: React.FC<SuggestionListProps> = ({ recommendVideos }) => {
  return (
    <div className=" w-full h-full flex flex-col justify-start mb-2 lg:border-l-2 lg:border-t-0 border-t-2 border-gray-100 p-3 gap-5">
      {recommendVideos.map((video: IRecomendation) => (
        <SuggestionCard post={video} key={video._id} />
      ))}
    </div>
  );
};

export default SuggestionList;
