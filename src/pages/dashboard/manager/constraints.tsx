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
        <h1 className="my-2 text-4xl font-bold">Constraints</h1>
        <p className="text-gray-400">
          Do you want to add constraints to your schedule? You can add them
          below.
        </p>

        <section className="mt-12 h-full">
          <ConstraintsTable />
        </section>
      </main>
    </>
  );
};

export default Dashboard;
