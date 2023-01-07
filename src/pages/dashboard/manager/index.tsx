import type { NextPage } from "next";
import Head from "next/head";
import Calendar from "@components/calendar/Calendar";
import CalendarOptions from "@components/calendar/CalendarOptions";
import { useSession } from "next-auth/react";

const Dashboard: NextPage = () => {
  const session = useSession();
  console.log(session);
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Scheduler Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <section className="mt-12 h-full">
          <CalendarOptions />
          <div className="mt-12 h-full w-full">
            <Calendar />
          </div>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
