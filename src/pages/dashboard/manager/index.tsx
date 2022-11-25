import type { NextPage } from "next";
import Head from "next/head";

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
          <p>manager</p>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
