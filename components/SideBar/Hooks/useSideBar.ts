import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../../utils";
import usePlayListStore from "../../../store/playListStore";

export const useSideBar = (userProfile: any) => {
  const { playLists, setPlayLists } = usePlayListStore();
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/playLists/${userProfile?.id}`);
        if (response.data?.[0]?.playLists) {
          setPlayLists(response.data[0].playLists);
        }
        setFetched(true);
      } catch (err: any) {
        console.log(err.message);
      }
    };

    if (userProfile && !fetched) {
      fetchData();
    }
  }, [userProfile, fetched, setPlayLists]);

  return {
    playLists,
  };
};
