import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { trpc } from "@utils/trpc";
import { useSession } from "next-auth/react";
import { EmployeeAvailabilityInputTable } from "@components/table/index";

const EmployeeProfile: NextPage = () => {
  const { data: session, status } = useSession();
  const { data: employee, refetch } = trpc.employees.getEmployee.useQuery(
    {
      id: session?.user?.id as string,
    },
    {
      enabled: false,
    }
  );

  useEffect(() => {
    console.log(status, session);
    if (status === "authenticated" && session) {
      refetch();
    }
  }, [refetch, status, session]);

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Scheduler Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <section className="mt-12 h-full">
          <EmployeeAvailabilityInputTable employee={employee} />
        </section>
      </main>
    </>
  );
};

export default EmployeeProfile;
