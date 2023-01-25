import { useContext } from "react";
import { BusinessContext } from "@contexts/index";
import type { NextPage } from "next";
import Head from "next/head";
import {
  BusinessImageCard,
  BusinessDepartmentsCard,
  BusinessStatisticsCard,
  BusinessPositionsCard,
} from "@components/card";
import BusinessHours from "@components/table/BusinessHours";

const Management: NextPage = () => {
  const { name } = useContext(BusinessContext);
  return (
    <>
      <Head>
        <title>Management</title>
        <meta name="description" content="Scheduler Management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <section className="mt-6">
          <h2 className="text-xl font-bold">{`${name} Business Information:`}</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <BusinessImageCard />
            <BusinessHours />
            <BusinessDepartmentsCard />
            <BusinessPositionsCard />
          </div>
          <BusinessStatisticsCard />
        </section>
      </main>
    </>
  );
};

export default Management;
