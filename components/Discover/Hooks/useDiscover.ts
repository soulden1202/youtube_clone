import { useRouter } from "next/router";

export const useDiscover = () => {
  const router = useRouter();
  const { topic } = router.query;

  return {
    activeTopic: topic,
  };
};
