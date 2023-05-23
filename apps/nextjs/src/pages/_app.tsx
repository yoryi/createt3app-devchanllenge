import type { AppType } from "next/app";
import { Inter } from "@next/font/google";
import clsx from "clsx";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

import { api } from "~/utils/api";
import { AccountWrapper } from "~/context/account/account";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <AccountWrapper>
        <div
          className={clsx(
            "h-full scroll-smooth font-sans antialiased",
            inter.className,
          )}
        >
          <Toaster />
          <Component {...pageProps} />
        </div>
      </AccountWrapper>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
