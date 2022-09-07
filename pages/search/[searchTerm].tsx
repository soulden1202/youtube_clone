import axios from "axios";

import React from "react";

import { Video } from "../../types";
import { BASE_URL } from "../../utils";

import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";

interface IProps {
  searchResult: Video[];
}

const Search = ({ searchResult }: IProps) => {
  return (
    <div className="flex flex-wrap gap-[15px] videos ">
      {searchResult.length ? (
        searchResult.map((video: Video) => (
          <div
            className=" object-fill xl:w-[32%] lg:w-[45%] md:w-[45%]"
            key={video._id}
          >
            <VideoCard post={video} />
          </div>
        ))
      ) : (
        <NoResults text="No videos" />
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const searchResult = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props: { searchResult: searchResult.data },
  };
};

export default Search;
