import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaCloudUploadAlt } from "react-icons/fa";

import axios from "axios";
import { SanityAssetDocument } from "@sanity/client";
import ReactLoading from "react-loading";
import { TiDeleteOutline } from "react-icons/ti";
import { TagsInput } from "react-tag-input-component";

import useAuthStore from "../store/authStore";
import { client } from "../utils/client";
import { BASE_URL } from "../utils";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const Upload = () => {
  const [isLoading, setisLoading] = useState(false);
  const [uploading, setuploading] = useState(false);
  const [isLoadingThumbnail, setisLoadingThumbnail] = useState(false);
  const [videoAsset, setvideoAsset] = useState<
    SanityAssetDocument | undefined
  >();
  const [imageAsset, setimageAsset] = useState<
    SanityAssetDocument | undefined
  >();
  const [wrongFileType, setwrongFileType] = useState(false);
  const [wrongFileTypeThumbnail, setwrongFileTypeThumbnail] = useState(false);

  const [caption, setcaption] = useState("");
  const [description, setdescription] = useState("");
  const [tags, setTags] = useState([""]);
  const [savingPost, setsavingPost] = useState(false);
  const [thumbnail, setthumbnail] = useState("");

  const router = useRouter();

  const { userProfile }: { userProfile: any } = useAuthStore();

  useEffect(() => {
    if (!userProfile) {
      router.push("/");
    }
  }, [userProfile]);

  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0];
    const fileTypes = [
      "video/mp4",
      "video/webm",
      "video/ogg",
      "video/x-matroska",
    ];

    if (fileTypes.includes(selectedFile?.type)) {
      setisLoading(true);
      client.assets
        .upload("file", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setvideoAsset(data);
          setisLoading(false);
        });
      setwrongFileType(false);
    } else {
      setisLoading(false);
      setwrongFileType(true);
    }
  };

  const handleRemove = () => {
    setvideoAsset(undefined);
  };

  const handleDiscard = () => {
    setvideoAsset(undefined);
    setdescription("");
    setTags([""]);
    setimageAsset(undefined);
    setcaption("");
    setthumbnail("");
  };

  const confirmDiscard = () => {
    confirmAlert({
      title: "Discard your video",
      message:
        "Are you sure you want to discard all information that you entered?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleDiscard(),
        },
        {
          label: "No",
          onClick: () => close(),
        },
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
    });
  };

  const uploadThumbnail = async (e: any) => {
    const selectedFile = e.target.files[0];
    setthumbnail(selectedFile.filename);

    const fileTypes = ["image/jpg", "image/jpeg", "image/png"];

    if (fileTypes.includes(selectedFile?.type)) {
      setisLoadingThumbnail(true);
      client.assets
        .upload("image", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setimageAsset(data);
          setisLoadingThumbnail(false);
        });
      setwrongFileTypeThumbnail(false);
    } else {
      setisLoadingThumbnail(false);
      setwrongFileTypeThumbnail(true);
    }
  };

  const handlePost = async () => {
    if (caption && videoAsset?._id && tags && description && imageAsset?._id) {
      setsavingPost(true);

      const document = {
        _type: "post",
        caption,
        uploadVideo: {
          video: {
            _type: "file",
            asset: {
              _type: "reference",
              _ref: videoAsset?._id,
            },
          },
          thumbnail: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: imageAsset?._id,
            },
          },
        },
        userId: userProfile?.id,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?.id,
        },
        description,
        tags: tags,
        createdAt: new Date().toISOString(),
        viewCount: 0,
      };

      setuploading(true);
      await axios.post(`${BASE_URL}/api/post`, document);
      setuploading(false);
      router.push(`/`);
    }
  };

  return (
    <>
      {userProfile && (
        <div className="w-full h-full ">
          <div className="bg-white dark:bg-black rounded-lg">
            {uploading ? (
              <div className="flex fixed items-center justify-center w-full h-[80%] ">
                <ReactLoading type="spinningBubbles" color={"#808080"} />
              </div>
            ) : (
              <div>
                <div className="flex flex-col items-center mb-5">
                  <p className="dark:text-white text-2xl font-bold">
                    Upload Video
                  </p>
                  <p className="text-md text-gray-400 ">
                    {" "}
                    Post a video to your account
                  </p>
                </div>
                <div className="flex md:flex-row flex-col md:gap-8 gap-3 md:items-center justify-center">
                  <div
                    className={`border-dashed rounded-xl border-4 border-gray-200 
          dark:border-gray-400 flex flex-col justify-center items-centered
           outline-none mt-10 w-[360px] md:w-[560px] h-[460px] p-10 
           align-middle
           ${
             !videoAsset &&
             `hover:border-red-300 hover:bg-gray-100 
            dark:hover:border-red-400 dark:hover:bg-gray-800 cursor-pointer`
           }
            `}
                  >
                    {isLoading ? (
                      <div className="flex flex-col items-center justify-center h-full">
                        <ReactLoading
                          type="spinningBubbles"
                          color={"#808080"}
                        />
                      </div>
                    ) : (
                      <div>
                        {videoAsset ? (
                          <div>
                            <div className="flex float-right mb-1">
                              <button
                                className="text-red-500 md:text-[45px]"
                                onClick={handleRemove}
                              >
                                <TiDeleteOutline></TiDeleteOutline>
                              </button>
                            </div>
                            <div className="mt-1 h-[260px]">
                              <video
                                src={videoAsset.url}
                                controls
                                className="rounded"
                              ></video>
                            </div>
                          </div>
                        ) : (
                          <label
                            className={`${!videoAsset && `cursor-pointer`}`}
                          >
                            <div className="flex flex-col items-center justify-center h-full">
                              <div className="flex flex-col items-center justify-center">
                                <p className="font-bold text-xl ">
                                  <FaCloudUploadAlt className="text-6xl text-gray-300" />
                                </p>
                                <p className="font-semibold text-xl dark:text-white">
                                  Upload Video
                                </p>
                              </div>
                            </div>
                            <input
                              type="file"
                              name="upload-video"
                              onChange={uploadVideo}
                              className="w-0 h-0"
                            ></input>
                          </label>
                        )}
                      </div>
                    )}
                    {wrongFileType && (
                      <p className="text-center text-xl text-red-400 font-semibold ">
                        Please select a video file
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-3 pb-10">
                    <label className="text-md font-medium dark:text-white">
                      Caption
                    </label>
                    <input
                      type="text"
                      value={caption}
                      onChange={(e) => {
                        setcaption(e.target.value);
                      }}
                      className="rounded outline-none text-md border-2 border-gray-200 p-2 lg-p-4 dark:bg-black dark:text-white"
                    />

                    <div className="flex flex-row gap-3 items-center ">
                      <label className="text-md font-medium dark:text-white">
                        Thumbnail
                      </label>
                      {isLoadingThumbnail && (
                        <div>
                          <ReactLoading
                            type="spinningBubbles"
                            color={"#808080"}
                            height={15}
                            width={15}
                          />
                        </div>
                      )}
                    </div>

                    <input
                      type="file"
                      value={thumbnail}
                      name="upload-thumbnail"
                      onChange={uploadThumbnail}
                      className="rounded outline-none text-md border-2 border-gray-200 p-2 lg-p-4 dark:bg-black dark:text-white"
                    />
                    {wrongFileTypeThumbnail && (
                      <p className=" text-sm text-red-400 font-semibold ">
                        Please select an image
                      </p>
                    )}

                    <label className="text-md font-medium dark:text-white">
                      Description
                    </label>
                    <textarea
                      name="paragraph_text"
                      value={description}
                      onChange={(e) => setdescription(e.target.value)}
                      rows={5}
                      className="rounded outline-none text-md border-2 border-gray-200 p-2 lg-p-4 dark:bg-black dark:text-white"
                    ></textarea>
                    <label className="text-md font-medium dark:text-white">
                      Tags
                    </label>
                    <div className="rounded outline-none text-md border-2 border-gray-200 p-2 lg-p-4 dark:bg-black ">
                      <TagsInput
                        value={tags}
                        onChange={setTags}
                        name="tags"
                        classNames={{
                          input: "text-gray-500",
                        }}
                        placeHolder="Enter your tags here"
                      />
                    </div>

                    <div className="flex gap-6 mt-10">
                      <button
                        onClick={handlePost}
                        type="button"
                        className="text-md font-medium p-2 rounded w-28 lg:w-44 outline-none bg-[#F51997] text-white"
                      >
                        Upload
                      </button>
                      <button
                        onClick={confirmDiscard}
                        type="button"
                        className="border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none dark:bg-black dark:text-white"
                      >
                        Discard
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Upload;
