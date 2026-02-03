import useAuthStore from "../../../store/authStore";

export const usePlayListQueueContainer = (playListId?: string, playListQueue?: any) => {
  const { userProfile }: { userProfile: any } = useAuthStore();

  const createLink = (index: number) => {
    const video = playListQueue?.videos[index];
    return {
      pathname: `/detail/${video?._id}`,
      query: {
        playList: playListId,
        index: index,
        userId: userProfile.id,
      },
    };
  };

  return {
    userProfile,
    createLink,
  };
};
