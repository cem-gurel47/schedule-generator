import type { NextPage } from "next";
import Head from "next/head";
import Calendar from "@components/calendar/employee/EmployeeCalendar";
import CalendarOptions from "@components/calendar/employee/EmployeeCalendarOptions";

const Dashboard: NextPage = () => {
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
            <Calendar type="default" />
          </div>
        </section>
      </main>
    </>
  );
};

export default Dashboard;