import React, { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";

import Link from "next/link";

import {
  AiOutlineMenu,
  AiOutlineHome,
  AiOutlineLike,
  AiOutlinePlayCircle,
} from "react-icons/ai";

import useAuthStore from "../store/authStore";

import Logo from "../utils/extreme-11.png";
import { Box, Modal } from "@mui/material";

interface IProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const SideBar = ({ open, setOpen }: IProps) => {
  const { userProfile }: { userProfile: any } = useAuthStore();

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="absolute h-[100vh] w-[200px] bg-sidebar">
        <div className="flex flex-col">
          <div className="flex flex-row items-center justify-center ml-3">
            <button
              onClick={() => setOpen(false)}
              className="text-white dark:text-white text-[1.5rem]  ml-3"
            >
              <AiOutlineMenu onClick={() => setOpen(false)} />
            </button>
            <Link href="/">
              <div className="w-[100px] md:w-[130px] h-full mt-3 ml-3">
                <Image
                  className="cursor-pointer"
                  src={Logo}
                  alt="logo"
                  height={60}
                  width={60}
                  layout="intrinsic"
                ></Image>
              </div>
            </Link>
          </div>

          <div className="border-t-[1px] border-gray-white"></div>
          <div className="flex flex-col items-start">
            <Link href="/">
              <div
                className="flex w-full h-[3rem] hover:bg-gray-700 items-center justify-center  cursor-pointer"
                onClick={() => setOpen(false)}
              >
                <div className="flex flex-row gap-3 text-white items-center justify-center">
                  <span className="text-lg">
                    <AiOutlineHome></AiOutlineHome>
                  </span>
                  <span>Home</span>
                </div>
              </div>
            </Link>

            {userProfile && (
              <div
                className="flex w-full h-[3rem] hover:bg-gray-700 items-center justify-center mr-6  cursor-pointer"
                onClick={() => setOpen(false)}
              >
                <Link
                  href={{
                    pathname: "/liked",
                    query: {
                      id: userProfile._id,
                    },
                  }}
                >
                  <div className="flex flex-row gap-3 text-white items-center justify-center">
                    <span className="text-lg">
                      <AiOutlineLike></AiOutlineLike>
                    </span>
                    <span>Liked</span>
                  </div>
                </Link>
              </div>
            )}

            {userProfile && (
              <div
                className="flex w-full h-[3rem] hover:bg-gray-700 items-center justify-center cursor-pointer"
                onClick={() => setOpen(false)}
              >
                <Link
                  href={{
                    pathname: "/uploaded",
                    query: {
                      id: userProfile._id,
                    },
                  }}
                >
                  <div className="flex flex-row gap-3 text-white items-center justify-center">
                    <span className="text-lg">
                      <AiOutlinePlayCircle></AiOutlinePlayCircle>
                    </span>
                    <span>Videos</span>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default SideBar;
