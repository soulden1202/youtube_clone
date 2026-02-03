import React from "react";
import Like from "../../Like";
import Dislike from "../../Dislike";

interface VideoActionsProps {
  likes: any[];
  dislikes: any[];
  handleLike: (v: boolean) => void;
  handleDislike: (v: boolean) => void;
  userProfile: any;
}

const VideoActions: React.FC<VideoActionsProps> = ({ 
  likes, 
  dislikes, 
  handleLike, 
  handleDislike,
  userProfile 
}) => {
  if (!userProfile) return null;

  return (
    <div className="flex flex-row mr-10 gap-12">
      <div>
        <Like
          likes={likes}
          handleLike={() => handleLike(true)}
          handleUnlike={() => handleLike(false)}
        />
      </div>
      <div>
        <Dislike
          dislikes={dislikes}
          handleDislike={() => handleDislike(true)}
          handleUndislike={() => handleDislike(false)}
        />
      </div>
    </div>
  );
};

export default VideoActions;
