import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { BsFillMoonFill } from "react-icons/bs";
import { BsFillSunFill } from "react-icons/bs";

import Logo from "../utils/tiktik-logo.png";
import Switch from "react-switch";
import { createOrGetUser } from "../utils";
import useAuthStore from "../store/authStore";
import { IUser } from "../types";

interface IProps {
  isDarkMode: boolean;
  setisDarkMode: Dispatch<SetStateAction<boolean>>;
}

const NavBar = ({ setisDarkMode, isDarkMode }: IProps) => {
  const { userProfile, addUser, removeUser } = useAuthStore();
  const [user, setUser] = useState<IUser | null>();

  useEffect(() => {
    setUser(userProfile);
  }, [userProfile]);


  return (
    <div className="w-full bg-white dark:bg-black flex justify-between items-center border-b-2 border-gray-200 py-2 px-4 ">
      <Link href="/">
        <div className="w-[100px] md:w-[130px]">
          <Image
            className="cursor-pointer"
            src={Logo}
            alt="logo"
            layout="responsive"
          ></Image>
        </div>
      </Link>
      <div className="text-white">SEARCH</div>
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
