import type { NextPage } from "next";
import Head from "next/head";
// import { useContext, useState, useEffect } from "react";
// import { BusinessContext } from "@contexts/index";
// import { trpc } from "@utils/trpc";
// import { PlusCircleIcon } from "@heroicons/react/24/outline";

const Dashboard: NextPage = () => {
  //   const [selectedDepartment, setSelectedDepartment] = useState("");
  //   const { departments } = useContext(BusinessContext);
  //   const { data: positions } = trpc.business.getPositions.useQuery({});

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
            <SingleEmployeeCreationForm />
            <div className="divider divider-horizontal" />
            <MultipleEmployeeCreationForm />
          </div>
        </section>
      </main>
    </>
  );
};

const SingleEmployeeCreationForm = () => {
  return (
    <div className="h-full w-1/2">
      <h1 className="mb-2 text-3xl font-bold">Add New Employee</h1>
      <p>
        We will send an email to the employee with a link to set up their
        account. You just need to fill out the information below.
      </p>
      <div className="mt-4 flex w-full">
        <form className="w-full">
          <div className="flex flex-col justify-end">
            <label htmlFor="name">Name</label>
            <input
              required
              type="text"
              name="name"
              id="name"
              className="input-primary input"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              required
              type="email"
              name="email"
              id="email"
              className="input-primary input"
            />
          </div>
          <button className="btn-primary btn mt-4" type="submit">
            Send Employee Sign Up Link
          </button>
        </form>
      </div>
    </div>
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
