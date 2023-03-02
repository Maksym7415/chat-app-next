import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PATHS } from "@/core/constants/paths";

export default function useAuth(shouldRedirect) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   if (session?.error === "RefreshAccessTokenError") {
  //     signOut({ callbackUrl: PATHS.signIn, redirect: shouldRedirect });
  //   }

  //   if (session === null) {
  //     if (router.route !== PATHS.signIn) {
  //       router.replace(PATHS.signIn);
  //     }
  //     setIsAuthenticated(false);
  //   } else if (session !== undefined) {
  //     if (router.route === PATHS.signIn) {
  //       router.replace(PATHS.main);
  //     }
  //     setIsAuthenticated(true);
  //   }
  // }, [session]);

  return isAuthenticated;
}
