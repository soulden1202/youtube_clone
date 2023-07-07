import create from "zustand";
import { persist } from "zustand/middleware";

const playListStore = (set: any) => ({
  playLists: [],

  addPlayList: (newPlayList: any) => {
    set((state: any) => ({
      playLists: [...state.playLists, newPlayList],
    }));
  },

  setPlayLists: (playLists: any) => set({ playLists: playLists }),
  removePlayLists: () => set({ playLists: [] }),
  addVideoToPlayList: (newVideos: any, playListName: any, playLists: any) => {
    const temp = playLists;

    temp.forEach((playList: any) => {
      if (playList.playListName == playListName) {
        playList.videos.push({ _id: newVideos });
      }
    });
    set({ playLists: temp });
  },

  removeVideoFromPlayList: (
    videoToRemove: any,
    playListName: any,
    playLists: any
  ) => {
    const temp = playLists;

    temp.forEach((playList: any) => {
      if (playList.playListName == playListName) {
        playList.videos = playList.videos.filter(
          (v: any) => v._id !== videoToRemove
        );
      }
    });
    set({ playLists: temp });
  },
});

const usePlayListStore = create(
  persist(playListStore, {
    name: "playList",
  })
);

export default usePlayListStore;
