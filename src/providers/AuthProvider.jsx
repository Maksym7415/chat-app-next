"use client";

// import Cookies from "js-cookie";
import { useRouter, usePathname, redirect } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { useActions } from "@/hooks/useActions";
// import { useAuth } from "@/hooks/useAuth";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const pathName = usePathname();
  // const { user } = useAuth()
  // const { checkAuth, logout } = useActions()
  // const token = useSelector(({ authSlice }) => authSlice.headers.accessToken);

  const router = useRouter();

  console.log(router, "router");
  // console.log(token, "token");

  // if (pathName === "/sign-in") {
  //   if (token) router.push("sign-up");
  // }

  return children;
};

export default AuthProvider;
