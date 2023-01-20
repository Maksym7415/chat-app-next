export const checkIsToken = (ctx) => {
  const accessToken = ctx.req?.cookies?.["accessToken"];

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
