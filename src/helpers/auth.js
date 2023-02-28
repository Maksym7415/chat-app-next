
import { getSession } from "next-auth/react";

export const getHeaders = async () => {
  try {
    let headersConfig = {};

    const session = await getSession();
    if (session.accessToken) {
      headersConfig.Authorization = "Bearer " + session.accessToken;
    }

    return Object.keys(headersConfig).length ? headersConfig : null;
  } catch (error) {}
};
