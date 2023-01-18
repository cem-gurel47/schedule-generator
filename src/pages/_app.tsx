import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Layout, Header, Footer, Content } from "@components/layout";
import { trpc } from "../utils/trpc";
import {
  BusinessContextProvider,
  CalendarContextProvider,
  EmployeeContextProvider,
} from "@contexts/index";
import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <BusinessContextProvider>
        <CalendarContextProvider>
          <EmployeeContextProvider>
            <Layout>
              <Header />
              <Content>
                <Component {...pageProps} />
              </Content>
              <Footer />
            </Layout>
          </EmployeeContextProvider>
        </CalendarContextProvider>
      </BusinessContextProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
