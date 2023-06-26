import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import axios from "axios";
import { SanityAssetDocument } from "@sanity/client";
import ReactLoading from "react-loading";
import { TagsInput } from "react-tag-input-component";

import useAuthStore from "../store/authStore";
import { client } from "../utils/client";
import { BASE_URL } from "../utils";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { ToastContainer, toast } from "react-toastify";

interface IProps {
  id: string;
  currentCaption: string;
  currentDescription: string;
  currentTags: string[];
  postId: string;
}

const Edit = ({
  id,
  currentCaption,
  currentDescription,
  currentTags,
  postId,
}: IProps) => {
  const [updating, setuploading] = useState(false);
  const [isLoadingThumbnail, setisLoadingThumbnail] = useState(false);
  const [imageAsset, setimageAsset] = useState<
    SanityAssetDocument | undefined
  >();

  const [wrongFileTypeThumbnail, setwrongFileTypeThumbnail] = useState(false);

  const [caption, setcaption] = useState(currentCaption || "");
  const [description, setdescription] = useState(currentDescription || "");
  const [tags, setTags] = useState(currentTags || [""]);
  const [savingPost, setsavingPost] = useState(false);
  const [thumbnail, setthumbnail] = useState("");

  const router = useRouter();

  const { userProfile }: { userProfile: any } = useAuthStore();

  useEffect(() => {
    if (!userProfile) {
      router.push("/");
    }
  }, [userProfile]);

  const handleDiscard = () => {
    setdescription("");
    setTags([""]);
    setimageAsset(undefined);
    setcaption("");
    setthumbnail("");
  };

  const confirmDiscard = () => {
    confirmAlert({
      title: "Discard your changed",
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
    if (caption && tags && description) {
      setsavingPost(true);

      const data = {
        id: id,
        postId: postId,
        caption: caption,
        description: description,
        tags: tags,
        imageAsset: imageAsset,
      };

      setuploading(true);
      const idToast = toast.loading("Updating your video", {
        position: "bottom-right",

        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        isLoading: true,
      });
      await axios
        .put(`${BASE_URL}/api/post/edit`, data)
        .then((response) => {
          toast.update(idToast, {
            render: "Your video has been updated",
            type: "success",
            isLoading: false,
            autoClose: 5000,
            hideProgressBar: true,
          });
          setTimeout(() => {
            router.push(`/`);
          }, 1000);
        })
        .catch((error) => {
          toast.update(idToast, {
            render: error.message,
            type: "error",
            isLoading: false,
            autoClose: 5000,
            hideProgressBar: true,
          });
          setuploading(false);
        });
    }
  };

  return (
    <>
      {userProfile && (
        <div className="w-full h-full ">
          <ToastContainer />
          <div className="bg-white dark:bg-black rounded-lg">
            <div>
              <div className="flex flex-col items-center mb-5">
                <p className="dark:text-white text-2xl font-bold">
                  Update Your Video
                </p>
                \
              </div>
              <div className="flex md:flex-row flex-col md:gap-8 gap-3 md:items-center justify-center">
                <div className="flex flex-col gap-3 pb-10">
                  <label className="text-md font-medium dark:text-white">
                    Caption
                  </label>
                  <input
                    type="text"
                    value={caption}
                    disabled={updating}
                    onChange={(e) => {
                      setcaption(e.target.value);
                    }}
                    className="rounded outline-none text-md border-2 border-gray-200 p-2 lg-p-4 dark:bg-black dark:text-white"
                  />

                  <div className="flex flex-row gap-3 items-center ">
                    <label className="text-md font-medium dark:text-white">
                      Thumbnail (Leave this empty if you don&apos;t want to
                      chang the thumbnail)
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
                    disabled={updating}
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
                    disabled={updating}
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
                      disabled={updating}
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
                      disabled={updating}
                      className={`text-md  font-medium p-2 rounded w-28 lg:w-44 outline-none bg-[#F51997] text-white ${
                        updating ? `bg-gray-500` : `  bg-[#F51997]`
                      }`}
                    >
                      Upload
                    </button>
                    <button
                      onClick={confirmDiscard}
                      type="button"
                      disabled={updating}
                      className={`border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-non dark:text-white ${
                        updating ? `bg-gray-500` : `  dark:bg-white`
                      }`}
                    >
                      Discard
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const getServerSideProps = async (context: any) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  let id: string = context.query.id;
  let postId: string = context.query.postId;
  let currentCaption: string = context.query.caption;
  let currentDescription: string = context.query.description;
  let currentTags: [string] = context.query.tags;

  if (!session || session.user.id !== id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    return {
      props: {
        id: id,
        currentCaption: currentCaption,
        currentDescription: currentDescription,
        currentTags: currentTags,
        postId: postId,
      },
    };
  }
};

export default Edit;
