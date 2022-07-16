import axios from "axios";
import NoResults from "../components/NoResults";
import VideoCard from "../components/VideoCard";
import { Video } from "../types";
import { BASE_URL } from "../utils";

interface IProps {
  videos: Video[];
}

const Home = ({ videos }: IProps) => {
  return (
    <div className="flex flex-wrap gap-[15px] videos ">
      {videos.length ? (
        videos.map((video: Video) => (
          <div className=" object-fill xl:w-[32%] lg:w-[45%] md:w-[45%]">
            <VideoCard post={video} key={video._id} />
          </div>
        ))
      ) : (
        <NoResults text="No Post" />
      )}
    </div>
  );
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
