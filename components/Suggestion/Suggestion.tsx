import React from "react";
import { IRecomendation } from "../../types/index";
import SuggestionList from "./Atoms/SuggestionList";

interface IProps {
  recommendVideos: IRecomendation[];
}

const Suggestion = ({ recommendVideos }: IProps) => {
  return (
    <div className="bg-white w-full flex dark:bg-black h-full">
      <SuggestionList recommendVideos={recommendVideos} />
    </div>
  );
};

export default Suggestion;
