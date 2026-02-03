import { useTopProgressBar } from "./Hooks/useTopProgressBar";

const TopProgressBar = () => {
  const { init } = useTopProgressBar();
  // We need to call init() once. In a real Next.js app, this logic might be better in _app.tsx
  // but we keep the structure for now.
  if (typeof window !== "undefined") {
    init();
  }
  return null;
};

export default TopProgressBar;
