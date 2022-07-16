import axios from "axios";
import moment from "moment";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { GoVerified } from "react-icons/go";
import ReactLoading from "react-loading";
import Sugestion from "../../components/Sugestion";
import Image from "next/image";
import { Video } from "../../types";
import { BASE_URL } from "../../utils";
import useAuthStore from "../../store/authStore";
import Like from "../../components/Like";
import Dislike from "../../components/Dislike";

interface IProps {
  postDetails: Video;
}

const Detail = ({ postDetails }: IProps) => {
  const [post, setpost] = useState(postDetails);
  const [showDes, setshowDes] = useState(false);
  const { userProfile }: { userProfile: any } = useAuthStore();

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like,
      });

      setpost({ ...post, likes: data.likes, dislikes: data.dislikes });
    }
  };

  const handleDislike = async (dislike: boolean) => {
    if (userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/dislike`, {
        userId: userProfile._id,
        postId: post._id,
        dislike,
      });

      setpost({ ...post, likes: data.likes, dislikes: data.dislikes });
    }
  };

  if (!post) {
    return <ReactLoading type="spinningBubbles" color={"#808080"} />;
  }
  const videoRef = useRef(null);

  return (
    <div className="bg-white dark:bg-black w-full h-full">
      <div className="flex lg:flex-row flex-col gap-6 md:gap-20">
        <div className="mt-0 flex flex-col gap-10 overflow-hidden h-full videos flex-1 object-fill">
          <div className="xl:w-[100%] w-[95%] ">
            <video
              ref={videoRef}
              autoPlay
              className=" flex mx-1 h-[400px] lg:h-[500px] w-full"
              src={post.uploadVideo.video.asset.url}
              controls
            ></video>
          </div>
          <div className="mt-0 flex flex-row justify-between align-center  border-b-2  border-gray-400">
            <div className="ml-3 flex flex-col w-[50%]">
              <div className="flex flex-row">
                <div className="w-10 h-10 mr-2 ">
                  <div>
                    <Link href="/">
                      <>
                        <Image
                          width={65}
                          height={65}
                          className="rounded-full cursor-pointer"
                          src={post.postedBy.image}
                          alt="profile photo"
                        ></Image>
                      </>
                    </Link>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="flex flex-col  gap-1">
                    <p className="flex gap-2 items-center md:text-md font-bold text-primary dark:text-white">
                      {post.caption}
                    </p>
                    <div className=" flex flex-col gap-1">
                      <div>
                        <p className="flex gap-1 font-medium text-xs items-center text-primary dark:text-white">
                          {post.postedBy.userName} {` `}
                          <GoVerified className="text-blue-400 text-md" />
                        </p>
                      </div>

                      <div className="flex md:flex-row flex-col gap-1 ">
                        <div>
                          <p className="  text-xsfont-medium text-xs capitalize text-gray-500 dark:text-gray-300 ">
                            {post.viewCount > 1
                              ? ` ${post.viewCount} views`
                              : ` ${post.viewCount} view`}
                          </p>
                        </div>

                        <span className=" font-medium text-xs capitalize text-gray-500 dark:text-gray-300 hidden md:block">
                          {" "}
                          -{" "}
                        </span>
                        <div>
                          <p className=" font-medium text-xs capitalize text-gray-500 dark:text-gray-300 ">
                            {moment(`${post.createdAt}`).format("MMM Do YYYY")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {!showDes && (
                  <span
                    onClick={() => setshowDes(true)}
                    className="ml-[2.9rem] cursor-pointer font-medium text-xs capitalize text-blue-500 dark:text-blue-500 hover:underline"
                  >
                    Show Description
                  </span>
                )}

                {showDes && (
                  <div className="ml-[2.9rem] mt-3">
                    <div className="font-medium text-xs capitalize text-gray-500 dark:text-gray-300 ">
                      {post.description}
                    </div>
                    <div className="mt-3 ">
                      <span
                        onClick={() => setshowDes(false)}
                        className="cursor-pointer font-medium text-xs capitalize text-blue-500 dark:text-blue-500 hover:underline"
                      >
                        Hide Description
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {userProfile && (
              <div className="flex flex-row mr-10 gap-12">
                <div>
                  <Like
                    likes={post.likes}
                    handleLike={() => handleLike(true)}
                    handleUnlike={() => handleLike(false)}
                  ></Like>
                </div>
                <div>
                  <Dislike
                    dislikes={post.dislikes}
                    handleDislike={() => handleDislike(true)}
                    handleUndislike={() => handleDislike(false)}
                  ></Dislike>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="h-[92vh] overflow-hidden">
          <Sugestion tags={postDetails.tags} />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`);

  return {
    props: { postDetails: data },
  };
};

export default Detail;
