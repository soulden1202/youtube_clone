import axios from "axios";
import moment from "moment";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { GoVerified } from "react-icons/go";
import ReactLoading from "react-loading";
import Sugestion from "../../components/Suggestion";
import Image from "next/image";
import { IPlayListQueue, IRecomendation, Video } from "../../types";
import { BASE_URL } from "../../utils";
import useAuthStore from "../../store/authStore";
import Like from "../../components/Like";
import Dislike from "../../components/Dislike";
import Comments from "../../components/Comments";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import PlayListQueueContainer from "../../components/PlayListQueueContainer";
import { useRouter } from "next/router";

interface IProps {
  postDetails: Video;
  recommendVideos: IRecomendation[];
  key?: string;
  playListId?: string;
  currentIndex?: number;
  playListQueue?: IPlayListQueue;
}

const Detail = ({
  postDetails,
  recommendVideos,
  key,
  playListId,
  currentIndex,
  playListQueue,
}: IProps) => {
  const [post, setpost] = useState(postDetails);
  const [showDes, setshowDes] = useState(false);
  const { userProfile }: { userProfile: any } = useAuthStore();
  const [comment, setComment] = useState("");
  const [allComments, setallComments] = useState(postDetails.comments);
  const [Preview, setPreview] = useState(false);

  const router = useRouter();

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile.id,
        postId: post._id,
        like,
      });

      if (!(userProfile.id == post.postedBy._id) && like) {
        const name: String[] = userProfile.name.split(" ");
        const notificationDetail = {
          subscriberId: post.postedBy._id,
          firstName: name[0],
          lastName: name[1],
          videoLink: window.location.href,
        };
        axios.put(
          `${BASE_URL}/api/novu/triggers/likedNotification`,
          notificationDetail
        );
      }

      setpost({ ...post, likes: data.likes, dislikes: data.dislikes });
    }
  };

  const handleDislike = async (dislike: boolean) => {
    if (userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/dislike`, {
        userId: userProfile.id,
        postId: post._id,
        dislike,
      });

      setpost({ ...post, likes: data.likes, dislikes: data.dislikes });
    }
  };

  const videoEndHandler = () => {
    if (!playListId) {
      let firstVideo = recommendVideos[0];

      //todo update this so a preview pop up before going to the next video
      router.push(`/detail/${firstVideo._id}`);
    } else {
      let nextIndex = (currentIndex || 0) + 1;
      let playListLength = playListQueue?.videos.length || 0;
      if (nextIndex >= playListLength) {
        nextIndex = 0;
      }
      let nextVideo = playListQueue?.videos[nextIndex];

      router.push({
        pathname: `/detail/${nextVideo?._id}`,
        query: {
          playList: playListId,
          index: nextIndex,
          userId: userProfile.id,
        },
      });
    }
  };

  const addComment = async (e: any) => {
    e.preventDefault();

    if (userProfile && comment) {
      const temp = {
        comment: comment,
        _key: "",
        commentAt: new Date().toISOString(),
        postedBy: {
          _id: userProfile.id,
          _ref: userProfile._ref,
          userName: userProfile.userName,
          image: userProfile.image,
        },
      };

      if (allComments) {
        setallComments([...allComments, temp]);
      } else {
        setallComments([temp]);
      }

      setComment("");

      await axios.put(`${BASE_URL}/api/post/${post._id}`, {
        userId: userProfile.id,
        comment,
      });
    }
  };

  if (!post) {
    return <ReactLoading type="spinningBubbles" color={"#808080"} />;
  }

  return (
    <div className="bg-white dark:bg-black w-full h-full">
      <div className="flex lg:flex-row flex-col gap-6">
        <div className="mt-0 flex flex-col gap-10 overflow-hidden w-[100%] lg:w-[60%] h-full videos  object-fill">
          <div className="flex xl:w-[100%] w-[95%] ">
            <video
              autoPlay
              className=" flex mx-1 w-full"
              src={post.uploadVideo.video.asset.url}
              controls
              onEnded={videoEndHandler}
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
          <div>
            <Comments
              comment={comment}
              setComment={setComment}
              addComment={addComment}
              comments={allComments}
              setallcommnets={setallComments}
            ></Comments>
          </div>
        </div>
        <div className="flex flex-col lg:w-[40%] overflow-hidden">
          {playListId && (
            <div className="">
              <PlayListQueueContainer
                key={key}
                playListId={playListId || ""}
                currentIndex={currentIndex}
                playListQueue={playListQueue}
              />
            </div>
          )}

          <div className="">
            <Sugestion recommendVideos={recommendVideos} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const videoId = context.query.id[0];

  const { data } = await axios.get(`${BASE_URL}/api/post/${videoId}`);
  const dataToRquest = {
    tags: data.tags,
    id: data._id,
  };
  const recomendation = await axios.post(
    `${BASE_URL}/api/recomendation`,
    dataToRquest
  );

  //if this video is from play list
  if (context.query.playList) {
    //make sure that user is logged in
    const session = await getServerSession(
      context.req,
      context.res,
      authOptions
    );
    let userId: string = context.query.userId;
    let playListId: string = context.query.playList;
    if (!session || session.user.id !== userId) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    //get video list queue
    const dataToPass = {
      userId: userId,
      playListId: playListId,
    };

    //todo: use store to store playList so we dont re fetch it everytime next video playing
    const playListVideoQueue = await axios.post(
      `${BASE_URL}/api/playListQueue`,
      dataToPass,
      {
        headers: {
          cookie: context.req.headers.cookie || "",
        },
      }
    );

    //this will return the details of the first video in playlist
    //iniciate the index to 0 (since we clicked playall in a play list)
    //get the playList as queue
    return {
      props: {
        postDetails: data,
        recommendVideos: recomendation.data,
        key: videoId,
        playListId: playListId,
        currentIndex: Number(context.query.index),
        playListQueue: playListVideoQueue?.data[0],
      },
    };
  } else {
    return {
      props: {
        postDetails: data,
        recommendVideos: recomendation.data,
        key: videoId,
      },
    };
  }
};

export default Detail;
