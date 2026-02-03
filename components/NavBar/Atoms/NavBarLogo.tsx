import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@material-tailwind/react";
import { AiOutlineMenu } from "react-icons/ai";
import SideBar from "../../SideBar";
import Logo from "../../../utils/extreme-11.png";

interface NavBarLogoProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpen: () => void;
}

const NavBarLogo: React.FC<NavBarLogoProps> = ({ open, setOpen, handleOpen }) => {
  return (
    <div className="flex flex-row gap-0 justify-center items-center">
      <button 
        onClick={handleOpen} 
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
      >
        <AiOutlineMenu className="text-black dark:text-white text-xl cursor-pointer" />
      </button>
      <SideBar open={open} setOpen={setOpen} />

      <Link href="/">
        <div className="w-[100px] md:w-[130px] h-full mt-3">
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
  );
};

export default NavBarLogo;
