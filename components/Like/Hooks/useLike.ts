import { useState, useEffect } from "react";

export const useLike = (likes: any[], userProfile: any) => {
  const [totalLikes, setTotalLikes] = useState(likes?.length || 0);
  const [alreadyLiked, setAlreadyLiked] = useState(false);

  useEffect(() => {
    const filterLike = likes?.filter((item) => item._ref === userProfile?.id);
    setAlreadyLiked(filterLike?.length > 0);
  }, [likes, userProfile]);

  return {
    totalLikes,
    setTotalLikes,
    alreadyLiked,
    setAlreadyLiked,
  };
};
