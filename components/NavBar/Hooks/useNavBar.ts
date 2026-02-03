import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import axios from "axios";
import useAuthStore from "../../../store/authStore";
import usePlayListStore from "../../../store/playListStore";
import { BASE_URL } from "../../../utils";

export const useNavBar = () => {
  const { addUser, removeUser, userProfile } = useAuthStore();
  const { removePlayLists } = usePlayListStore();
  const router = useRouter();
  const { data: session, status } = useSession();

  const [searchTerms, setsearchTerms] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const checkSubscriber = async () => {
    if (localStorage.getItem("subcribed") === "true") return;

    // @ts-ignore
    if (session?.user?.id) {
      try {
        // @ts-ignore
        await axios.get(`${BASE_URL}/api/novu/${session?.user?.id}`);
        localStorage.setItem("subcribed", "true");
      } catch (err: any) {
        if (err.response?.status === 404) {
          const name = session?.user?.name?.split(" ") || ["Unamed", "user"];
          const firstName = name[0];
          const lastName = name[1] || "";
          
          // @ts-ignore
          await axios.put(`${BASE_URL}/api/novu/${session?.user?.id}`, {
            firstName,
            lastName,
            avatar: session?.user?.image,
          });
          localStorage.setItem("subcribed", "true");
        }
      }
    }
  };

  const syncWithDatabases = async () => {
    const userData = {
      userName: session?.user?.name,
      image: session?.user?.image,
      // @ts-ignore
      _id: session?.user?.id,
    };
    await axios.post(`${BASE_URL}/api/auth`, userData);
  };

  useEffect(() => {
    if (status === "authenticated") {
      if (!userProfile) {
        addUser(session.user);
        syncWithDatabases();
      }
      checkSubscriber();
    }
  }, [session]);

  const handleSearch = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (searchTerms) {
      router.push(`/search/${searchTerms}`);
    }
  };

  const handleSignOut = () => {
    signOut();
    removeUser();
    removePlayLists();
    localStorage.removeItem("subcribed");
    router.push("/");
  };

  const onNotificationClick = (notification: any) => {
    router.push(notification.cta.data.url);
  };

  return {
    session,
    status,
    searchTerms,
    setsearchTerms,
    open,
    setOpen,
    handleOpen,
    handleSearch,
    handleSignOut,
    onNotificationClick,
  };
};
