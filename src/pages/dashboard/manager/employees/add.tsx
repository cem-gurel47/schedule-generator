import type { NextPage } from "next";
import Head from "next/head";
import { SingleEmployeeCreationFormCard } from "@components/card/index";
const Dashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>Add New Employee</title>
        <meta name="description" content="Scheduler Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen">
        <section className="mt-12 min-h-screen">
          <div className="flex min-h-screen gap-4">
            <SingleEmployeeCreationFormCard />
            <div className="divider divider-horizontal" />
            <MultipleEmployeeCreationForm />
          </div>
        </section>
      </main>
    </>
  );
};

const MultipleEmployeeCreationForm = () => {
  return (
    <div className="h-full w-1/2">
      <h1 className="mb-2 text-3xl font-bold">Add Multiple Employees</h1>
      <p>
        Want to create multiple employees at once? Just upload a list of names
        and emails below. We will send an email to each employee with a link to
        set up their account.
      </p>
      <div className="mt-4 flex w-full">
        <form className="w-full">
          <input type="file" className="file-input w-full max-w-xs" />
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
