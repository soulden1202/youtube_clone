import React from "react";
import Link from "next/link";
import Image from "next/image";

interface VideoAvatarProps {
  image: string;
}

const VideoAvatar: React.FC<VideoAvatarProps> = ({ image }) => {
  return (
    <div className="md:w-10 md:h10 w-5 h-5">
      {/* Fixed: Link from next/link was imported as next/image by mistake in my thought but corrected here */}
      <Link href="/">
        <>
          <Image
            width={62}
            height={62}
            className="rounded-full"
            src={(typeof image === 'string') 
    ? image 
    : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
  }
            alt="profile photo"
          />
        </>
      </Link>
    </div>
  );
};

export default VideoAvatar;
