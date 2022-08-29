import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import {
  AiOutlineLogout,
  AiOutlineMenu,
  AiOutlineSearch,
} from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { BsFillMoonFill } from "react-icons/bs";
import { BsFillSunFill } from "react-icons/bs";

import Logo from "../utils/extreme-11.png";
import Switch from "react-switch";
import { createOrGetUser } from "../utils";
import useAuthStore from "../store/authStore";
import { IUser } from "../types";
import { Button, Input } from "@material-tailwind/react";
import SideBar from "./SideBar";
import { BASE_URL } from "../utils";

import {
  FormControl,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";

interface IProps {
  isDarkMode: boolean;
  setisDarkMode: Dispatch<SetStateAction<boolean>>;
}

const NavBar = ({ setisDarkMode, isDarkMode }: IProps) => {
  const { userProfile, addUser, removeUser } = useAuthStore();
  const [user, setUser] = useState<IUser | null>();
  const [isFocused, setisFocused] = useState(false);
  const router = useRouter();

  const [searchTerms, setsearchTerms] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    setUser(userProfile);
  }, [userProfile]);

  const handleSearch = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (searchTerms) {
      router.push(`/search/${searchTerms}`);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-black flex justify-between items-center border-b-2 border-gray-200 py-2 px-4 ">
      <div className="flex flex-row gap-0 justify-center items-center">
        <Button onClick={handleOpen} variant="text">
          <AiOutlineMenu className="text-black dark:text-white text-xl cursor-pointer" />
        </Button>
        <SideBar open={open} setOpen={setOpen}></SideBar>

        <Link href="/">
          <div className="w-[100px] md:w-[130px] h-full mt-3">
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

      <div className="dark:text-white ">
        <div className="relative hidden md:block">
          <form
            onSubmit={handleSearch}
            className="absolute md:static top-10 left-20 bg-white dark:bg-black"
          >
            <input
              type="text"
              id="input"
              value={searchTerms}
              onChange={(e) => {
                setsearchTerms(e.target.value);
              }}
              placeholder="Search Video"
              className="dark:text-white p-3 dark:bg-black bg-primary md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-200 dark:focus:border-gray-400 w-[300px] md:w-[350px] rounded-full md:top-0"
            />
            <button
              className="absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400"
              onClick={handleSearch}
            >
              <AiOutlineSearch></AiOutlineSearch>
            </button>
          </form>
        </div>
      </div>
      <Switch
        onChange={(checked) => {
          if (checked === true) {
            localStorage.setItem("theme", "true");
            setisDarkMode(true);
          } else {
            localStorage.setItem("theme", "false");
            setisDarkMode(false);
          }
        }}
        checked={isDarkMode}
        onColor="#808080"
        offColor="#fed8b1"
        checkedHandleIcon={<BsFillMoonFill className="mt-1 ml-1" />}
        uncheckedHandleIcon={<BsFillSunFill className="mt-1 ml-1 mr-1" />}
        uncheckedIcon={false}
        checkedIcon={false}
      />

      <div>
        {user ? (
          <div className="flex gap-5 md:gap-10">
            <Link href="/upload">
              <button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2">
                <IoMdAdd className="text-xl text-black dark:text-white"></IoMdAdd>
                <span className="hidden md:block text-black dark:text-white">
                  Upload
                </span>
              </button>
            </Link>
            {user.image && (
              <Link href="/">
                <>
                  <Image
                    width={40}
                    height={40}
                    className="rounded-full cursor-pointer"
                    src={user.image}
                    alt="profile photo"
                  ></Image>
                </>
              </Link>
            )}
            <button
              type="button"
              onClick={() => {
                googleLogout();
                removeUser();
              }}
              className="text-red-500 px-2 dark:text-red-700 border-2 rounded dark:border-white"
            >
              <AiOutlineLogout></AiOutlineLogout>
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(res) => createOrGetUser(res, addUser)}
            onError={() => console.log("Error")}
          />
        )}
      </div>
    </div>
  );
};

export default NavBar;
