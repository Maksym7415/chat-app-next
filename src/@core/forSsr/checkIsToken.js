import { getSession } from "next-auth/react";

export const checkIsToken = async (cxt) => {
  const session = await getSession(cxt);

  // console.log(session, "---checkIsToken");
  if (!session?.accessToken) {
    return {
      redirect: {
        dehydratedState: null,
        permanent: false,
        destination: "/sign-in",
      },
    };
  }
  return null;
};
