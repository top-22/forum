import { useEffect } from "react";
import { useRouter } from "next/router";

const useRedirectIfLoggedIn = () => {
  const router = useRouter();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      router.replace("/");
    }
  }, [router]);
};

export default useRedirectIfLoggedIn;
