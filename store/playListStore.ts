import create from "zustand";
import { persist } from "zustand/middleware";

const playListStore = (set: any) => ({
  playLists: [],

  addPlayList: (newPlayList: any) => {
    set((state: any) => ({ playLists: [...state.playLists, newPlayList] }));
  },

  setPlayLists: (playLists: any) => set({ playLists: playLists }),
  removePlayLists: () => set({ playLists: [] }),
});

const usePlayListStore = create(
  persist(playListStore, {
    name: "playList",
  })
);

export default usePlayListStore;
