import type { NextPage } from "next";
import Head from "next/head";
import { ConstraintsTable } from "@components/table";

const Dashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>Constraints</title>
        <meta name="description" content="Scheduler Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <section className="mt-12 h-full">
          <ConstraintsTable />
        </section>
      </main>
    </>
  );
};

export default Dashboard;
