import { namesCookies } from "@/core/constants/general";

export const checkIsToken = (ctx) => {
  const accessToken = ctx.req?.cookies?.[namesCookies.accessToken];

  if (!accessToken) {
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
