import React, { Dispatch, SetStateAction } from "react";
import Switch from "react-switch";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import NavBarLogo from "./Atoms/NavBarLogo";
import NavBarSearch from "./Atoms/NavBarSearch";
import NavBarAuth from "./Atoms/NavBarAuth";
import { useNavBar } from "./Hooks/useNavBar";

interface IProps {
  isDarkMode: boolean;
  setisDarkMode: Dispatch<SetStateAction<boolean>>;
}

const NavBar = ({ setisDarkMode, isDarkMode }: IProps) => {
  const {
    session,
    searchTerms,
    setsearchTerms,
    open,
    setOpen,
    handleOpen,
    handleSearch,
    handleSignOut,
    onNotificationClick,
  } = useNavBar();

  const handleThemeChange = (checked: boolean) => {
    localStorage.setItem("theme", checked ? "true" : "false");
    setisDarkMode(checked);
  };

  return (
    <div className="w-full bg-white dark:bg-black flex justify-between items-center border-b-2 border-gray-200 py-2 px-4 ">
      <NavBarLogo open={open} setOpen={setOpen} handleOpen={handleOpen} />

      <NavBarSearch
        searchTerms={searchTerms}
        setsearchTerms={setsearchTerms}
        handleSearch={handleSearch}
      />

      <Switch
        onChange={handleThemeChange}
        checked={isDarkMode}
        onColor="#808080"
        offColor="#fed8b1"
        checkedHandleIcon={<BsFillMoonFill className="mt-1 ml-1" />}
        uncheckedHandleIcon={<BsFillSunFill className="mt-1 ml-1 mr-1" />}
        uncheckedIcon={false}
        checkedIcon={false}
      />

      <NavBarAuth
        session={session}
        isDarkMode={isDarkMode}
        handleSignOut={handleSignOut}
        onNotificationClick={onNotificationClick}
      />
    </div>
  );
};

export default NavBar;
