import React from "react";
import Link from "next/link";
import Image from "next/image";
import { GoVerified } from "react-icons/go";

interface VideoUserProps {
  postedBy: any;
}

const VideoUser: React.FC<VideoUserProps> = ({ postedBy }) => {
  return (
    <div className="flex flex-row">
      <div className="w-10 h-10 mr-2 ">
        <div>
          <Link href="/">
            <>
              <Image
                width={65}
                height={65}
                className="rounded-full cursor-pointer"
                src={typeof postedBy?.image === 'string' 
                  ? postedBy.image 
                  : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"}
                alt="profile photo"
              />
            </>
          </Link>
        </div>
      </div>
      <div className="mb-3">
        <div className="flex flex-col gap-1">
          <div className="flex flex-col gap-1">
            <div>
              <p className="flex gap-1 font-medium text-xs items-center text-primary dark:text-white">
                {postedBy.userName} {` `}
                <GoVerified className="text-blue-400 text-md" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoUser;
