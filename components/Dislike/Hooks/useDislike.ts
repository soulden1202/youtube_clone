import { useState, useEffect } from "react";

export const useDislike = (dislikes: any[], userProfile: any) => {
  const [totalDisLike, setTotalDisLike] = useState(dislikes?.length || 0);
  const [alreadyDisliked, setAlreadyDisliked] = useState(false);

  useEffect(() => {
    const filterDislike = dislikes?.filter((item) => item._ref === userProfile?.id);
    setAlreadyDisliked(filterDislike?.length > 0);
  }, [dislikes, userProfile]);

  return {
    totalDisLike,
    setTotalDisLike,
    alreadyDisliked,
    setAlreadyDisliked,
  };
};
