import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AiOutlineMenu,
  AiOutlineHome,
  AiOutlineLike,
  AiOutlinePlayCircle,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { Box, Modal } from "@mui/material";
import useAuthStore from "../../store/authStore";
import Logo from "../../utils/extreme-11.png";
import { useSideBar } from "./Hooks/useSideBar";
import SideBarItem from "./Atoms/SideBarItem";

interface IProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const SideBar = ({ open, setOpen }: IProps) => {
  const { userProfile }: { userProfile: any } = useAuthStore();
  const { playLists } = useSideBar(userProfile);

  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="absolute h-[100vh] w-[200px] bg-sidebar overflow-auto">
        <div className="flex flex-col">
          <div className="flex flex-row items-center justify-center ml-3">
            <button
              onClick={handleClose}
              className="text-white dark:text-white text-[1.5rem]  ml-3"
            >
              <AiOutlineMenu />
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
                />
              </div>
            </Link>
          </div>

          <div className="border-t-[1px] border-gray-white" />
          <div className="flex flex-col items-start">
            <SideBarItem
              href="/"
              icon={<AiOutlineHome />}
              label="Home"
              onClick={handleClose}
            />

            {userProfile && (
              <SideBarItem
                href={{ pathname: "/liked", query: { id: userProfile.id } }}
                icon={<AiOutlineLike />}
                label="Liked"
                onClick={handleClose}
              />
            )}

            {userProfile && (
              <SideBarItem
                href={{ pathname: "/uploaded", query: { id: userProfile.id } }}
                icon={<AiOutlinePlayCircle />}
                label="Videos"
                onClick={handleClose}
              />
            )}

            {userProfile &&
              playLists?.length > 0 &&
              playLists.map((playList: any) => (
                <SideBarItem
                  key={playList._key}
                  href={{ pathname: `/playlist/${userProfile.id}/${playList._key}` }}
                  icon={<AiOutlineUnorderedList />}
                  label={playList.playListName}
                  onClick={handleClose}
                  className="flex pl-5 w-full h-[3rem] hover:bg-gray-700 cursor-pointer"
                />
              ))}
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default SideBar;
