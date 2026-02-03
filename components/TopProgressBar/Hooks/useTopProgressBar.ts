import Router from "next/router";
import NProgress from "nprogress";

let timer: any;
let state: any;
let activeRequests = 0;
const delay = 250;

export const useTopProgressBar = () => {
  const load = () => {
    if (state === "loading") return;
    state = "loading";
    timer = setTimeout(() => {
      NProgress.start();
    }, delay);
  };

  const stop = () => {
    if (activeRequests > 0) return;
    state = "stop";
    clearTimeout(timer);
    NProgress.done();
  };

  const init = () => {
    Router.events.on("routeChangeStart", load);
    Router.events.on("routeChangeComplete", stop);
    Router.events.on("routeChangeError", stop);

    const originalFetch = window.fetch;
    window.fetch = async function (...args) {
      if (activeRequests === 0) load();
      activeRequests++;
      try {
        return await originalFetch(...args);
      } finally {
        activeRequests -= 1;
        if (activeRequests === 0) stop();
      }
    };
  };

  return { init };
};
