import { useEffect } from "react";
import { useRouter } from "next/router";

const useRedirectIfLoggedIn = () => {
  const router = useRouter();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      const nextPath = (router.query.next as string) || "/";
      router.replace(nextPath);
    }
  }, [router]);
};

export default useRedirectIfLoggedIn;
