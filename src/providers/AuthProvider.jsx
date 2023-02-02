import { useEffect } from "react";

const AuthProvider = ({ children, Component: { isPrivatePage } }) => {
  useEffect(() => {}, []);

  return <>{children}</>;
};

export default AuthProvider;
