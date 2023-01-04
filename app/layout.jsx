import { Inter as FontSans } from "@next/font/google";
import { clsx } from "clsx";
import { unstable_getServerSession } from "next-auth/next";

import "./globals.css";
import "./reset.scss";

import Providers from "@/providers/MainProvider";
import EmotionRootStyleRegistry from "./EmotionRootStyleRegistry";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-inter",
});

const RootLayout = async ({ children, ...rest }) => {
  const session = await unstable_getServerSession();

  return (
    <html lang="en" className={clsx(fontSans.variable)}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <EmotionRootStyleRegistry>
          <Providers session={session}>{children}</Providers>
        </EmotionRootStyleRegistry>
        {/* {children} */}
      </body>
    </html>
  );
};

export default RootLayout;
