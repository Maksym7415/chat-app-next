import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getTokenCook } from "@/core/cookiesStorage/index";
import { PATHS } from "@/core/constants/paths";

const AuthProvider = ({ children, Component: { isPrivatePage } }) => {
  const router = useRouter();

  useEffect(() => {
    const accessToken = getTokenCook();
    // console.log(accessToken, "accessToken");
    // if (accessToken) {
    // } else {
    //   isPrivatePage && router.push(PATHS.signIn);
    // }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <>{children}</>;
};

export default AuthProvider;
