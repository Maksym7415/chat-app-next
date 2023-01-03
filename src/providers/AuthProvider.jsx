"use client";

// import Cookies from "js-cookie";
import { useRouter, usePathname, redirect } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { useActions } from "@/hooks/useActions";
// import { useAuthStore } from "@/hooks/useAuthStore";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const pathName = usePathname();
  // const { user } = useAuthStore()
  // const { checkAuth, logout } = useActions()
  // const token = useSelector(({ authSlice }) => authSlice.headers.accessToken);

  const router = useRouter();

  // if (pathName === "/sign-in") {
  //   if (token) router.push("sign-up");
  // }

  return children;
};

export default AuthProvider;
