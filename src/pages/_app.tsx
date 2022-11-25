import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Layout, Header, Footer, Content } from "@components/layout";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Header />
        <Content>
          <Component {...pageProps} />
        </Content>
        <Footer />
      </Layout>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
