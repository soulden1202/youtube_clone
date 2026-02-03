import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

interface NavBarSearchProps {
  searchTerms: string;
  setsearchTerms: (val: string) => void;
  handleSearch: (e: any) => void;
}

const NavBarSearch: React.FC<NavBarSearchProps> = ({
  searchTerms,
  setsearchTerms,
  handleSearch,
}) => {
  return (
    <div className="dark:text-white ">
      <div className="relative hidden md:block">
        <form
          onSubmit={handleSearch}
          className="absolute md:static top-10 left-20 bg-white dark:bg-black"
        >
          <input
            type="text"
            id="input"
            value={searchTerms}
            onChange={(e) => setsearchTerms(e.target.value)}
            placeholder="Search Video"
            className="dark:text-white p-3 dark:bg-black bg-primary md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-200 dark:focus:border-gray-400 w-[300px] md:w-[350px] rounded-full md:top-0"
          />
          <button
            className="absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400"
            onClick={handleSearch}
          >
            <AiOutlineSearch />
          </button>
        </form>
      </div>
    </div>
  );
};

export default NavBarSearch;
