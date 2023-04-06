import { useEffect } from "react";
import { useRouter } from "next/router";

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      router.replace(`/login?next=${encodeURIComponent(router.asPath)}`);
    }
  }, [router]);
};

export default useAuth;
