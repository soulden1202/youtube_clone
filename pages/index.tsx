import axios from "axios";
import { useEffect, useState } from "react";
import NoResults from "../components/NoResults";
import VideoCard from "../components/VideoCard";
import { Video } from "../types";
import { BASE_URL } from "../utils";
import ReactLoading from "react-loading";

interface IProps {
  videos: Video[];
}

const Home = ({ videos }: IProps) => {
  const [loading, setloading] = useState(true);

  useEffect(() => {
    if (videos) {
      setloading(false);
    }
  }, [videos]);

  if (loading) {
    return <ReactLoading type="spinningBubbles" color={"#808080"} />;
  } else {
    return (
      <div className="flex flex-wrap gap-[15px] videos ">
        {videos.length ? (
          videos.map((video: Video) => (
            <div className=" object-fill xl:w-[32%] lg:w-[45%] md:w-[45%]">
              <VideoCard post={video} key={video._id} />
            </div>
          ))
        ) : (
          <NoResults text="No videos" />
        )}
      </div>
    );
  }
};

export const getServerSideProps = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/post`);

  return {
    props: {
      videos: data,
    },
  };
};

export default Home;
