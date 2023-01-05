"use client";

// import Cookies from "js-cookie";
import { useRouter, usePathname, redirect } from "next/navigation";
import { useEffect } from "react";

// import { useActions } from "@/hooks/useActions";
// import { useAuthStore } from "@/hooks/useAuthStore";

const AuthProvider = ({ children }) => {
  const pathName = usePathname();
  // const { user } = useAuthStore()
  // const { checkAuth, logout } = useActions()
  const router = useRouter();

  // if (pathName === "/sign-in") {
  //   if (token) router.push("sign-up");
  // }

  return children;
};

export default AuthProvider;
