import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";

import NavBar from "../components/NavBar";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "nprogress/nprogress.css";
import dynamic from "next/dynamic";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setisSSR] = useState(true);
  const [isDarkMode, setisDarkMode] = useState(false);

  const TopProgressBar = dynamic(
    () => {
      return import("../components/TopProgressBar");
    },
    { ssr: false }
  );

  let darkmode = "";

  useEffect(() => {
    setisSSR(false);
    if (localStorage.getItem("theme") === null) {
      localStorage.setItem("theme", "false");
      setisDarkMode(false);
    }
    if (localStorage.getItem("theme") === "true") {
      setisDarkMode(true);
    } else if (localStorage.getItem("theme") === "false") {
      setisDarkMode(false);
    }
  }, []);

  if (isDarkMode) {
    darkmode = "dark";
  } else {
    darkmode = "";
  }

  if (isSSR) {
    return null;
  }

  return (
    <GoogleOAuthProvider
      clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
    >
      <div className={darkmode}>
        <div className="bg-white dark:bg-black w-full h-full">
          <NavBar isDarkMode={isDarkMode} setisDarkMode={setisDarkMode} />
          <div className="flex gap-5 ">
            <div className="mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1 ">
              <TopProgressBar />
              <Component {...pageProps} />
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default MyApp;
