import React, { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import GoogleLogin from "react-google-login";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import Discover from "./Discover";
import SuggestedAccounts from "./SuggestedAccounts";
import useAuthStore from "../store/authStore";
import Footer from "./Footer";

const SideBar = () => {
  const [showSidebar, setshowSidebar] = useState(true);

  const { userProfile } = useAuthStore();

  const normalLink =
    "flex items-center gap-3 hover:bg-primary p-3 justify:center xl:justify-start cursor:pointer font-semibold text-[#F51997] rounded";

  return (
    <div className="bg-white dark:bg-black h-[100vh]">
      <div
        className="block xl:hidden m-2 ml-4 mt-3 text-xl"
        onClick={() => setshowSidebar((state) => !state)}
      >
        {showSidebar ? (
          <ImCancelCircle className="text-black dark:text-white" />
        ) : (
          <AiOutlineMenu className="text-black dark:text-white" />
        )}
      </div>
      {showSidebar && (
        <div className="xl:w-300 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3">
          <div className="xl:border-b-2 border-gray-100 xl:pb-4">
            <Link href="./">
              <div className={normalLink}>
                <p className="text-2xl">
                  <AiFillHome></AiFillHome>
                </p>
                <span className="text-xl hidden xl:block">For You</span>
              </div>
            </Link>
          </div>
          {!userProfile && (
            <div className="px-2 py-4 hidden xl:block">
              <p className="text-gray-400 ">
                Login to like and comment on videos
              </p>
              <div className="pr-4">
                <GoogleLogin
                  clientId=""
                  render={(renderProps) => (
                    <button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      className="cursor-pointer dark:bg-black bg-white text-lg text-[#F51997] boder-[1px] border-[#F51997] font-semibold px-6 py-3 rounded-md outline-none w-full mt-3 hover:text-white hover:bg-[#F51997] dark:hover:bg-[#F51997]"
                    >
                      Login
                    </button>
                  )}
                  onSuccess={() => {}}
                  onFailure={() => {}}
                  cookiePolicy="single_host_origin"
                />
              </div>
            </div>
          )}

          <Discover />
          <SuggestedAccounts />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default SideBar;
