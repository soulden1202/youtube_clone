import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineLogout } from "react-icons/ai";
import { signIn } from "next-auth/react";
import {
  NovuProvider,
  PopoverNotificationCenter,
  NotificationBell,
} from "@novu/notification-center";

interface NavBarAuthProps {
  session: any;
  isDarkMode: boolean;
  handleSignOut: () => void;
  onNotificationClick: (n: any) => void;
}

const NavBarAuth: React.FC<NavBarAuthProps> = ({
  session,
  isDarkMode,
  handleSignOut,
  onNotificationClick,
}) => {
  return (
    <div>
      {session ? (
        <div className="flex gap-5 md:gap-10">
          <Link href="/upload">
            <button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2">
              <IoMdAdd className="text-xl text-black dark:text-white" />
              <span className="hidden md:block text-black dark:text-white">Upload</span>
            </button>
          </Link>
          {session.user?.image && (
            <Link href="/">
              <>
                <Image
                  width={40}
                  height={40}
                  className="rounded-full cursor-pointer"
                  src={typeof session?.user?.image === 'string' 
    ? session.user.image 
    : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
  }
                  alt="profile photo"
                />
              </>
            </Link>
          )}
          <button
            type="button"
            onClick={handleSignOut}
            className="text-red-500 px-2 dark:text-red-700 border-2 rounded dark:border-white"
          >
            <AiOutlineLogout />
          </button>
          <div className="mt-1">
            <NovuProvider
              subscriberId={session?.user?.id}
              applicationIdentifier={"OXeIN2dNSWJ1"}
            >
              <PopoverNotificationCenter
                colorScheme={isDarkMode ? "dark" : "light"}
                onNotificationClick={onNotificationClick}
              >
                {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
              </PopoverNotificationCenter>
            </NovuProvider>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => signIn("google")}
          className="text-red-500 px-3 hover:bg-black  dark:hover:bg-white py-2 dark:text-red-700 border-2 rounded dark:border-white"
        >
          Login
        </button>
      )}
    </div>
  );
};

export default NavBarAuth;
