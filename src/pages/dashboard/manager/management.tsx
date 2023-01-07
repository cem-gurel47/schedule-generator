import type { NextPage } from "next";
import Head from "next/head";
import { BusinessImageCard, BusinessInfoCard } from "@components/card";
import BusinessHours from "@components/table/BusinessHours";

const Management: NextPage = () => {
  return (
    <>
      <Head>
        <title>Management</title>
        <meta name="description" content="Scheduler Management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <section className="mt-6">
          <h2 className="text-xl font-bold">Business Information:</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <BusinessImageCard />
            <BusinessInfoCard />
            <BusinessHours />
          </div>
        </section>
      </main>
    </>
  );
};

export default Management;
