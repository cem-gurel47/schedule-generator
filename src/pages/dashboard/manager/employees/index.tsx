import type { NextPage } from "next";
import Head from "next/head";
import { useContext, useState, useEffect } from "react";
import { BusinessContext } from "@contexts/index";
import { trpc } from "@utils/trpc";
import { EmployeeCard } from "@components/card/index";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Dashboard: NextPage = () => {
  const { data: user } = useSession();
  const { departments, positions } = useContext(BusinessContext);

  const [selectedDepartment, setSelectedDepartment] = useState<
    string | null | undefined
  >(departments ? departments[0] : null);
  const [selectedPosition, setSelectedPosition] = useState<
    string | null | undefined
  >(null);
  const [search, setSearch] = useState<string>("");

  const {
    data: employees,
    isLoading,
    refetch,
  } = trpc.employees.getEmployees.useQuery({
    department: selectedDepartment,
    position: selectedPosition,
  });

  const filteredEmployees = employees?.filter((employee) => {
    return (
      employee.name.toLowerCase().includes(search.toLowerCase()) &&
      employee.id !== user?.user?.id
    );
  });

  useEffect(() => {
    if (selectedDepartment) {
      refetch();
    }
  }, [refetch, selectedDepartment, selectedPosition]);

  if (isLoading || !filteredEmployees) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Employees</title>
        <meta name="description" content="Scheduler Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <section className="mt-12 h-full">
          <div className="flex justify-end gap-4">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search name"
              className="input-bordered input"
            />
            {positions.length !== 0 && (
              <select
                className="select-bordered select"
                onChange={(e) => setSelectedPosition(e.target.value)}
              >
                {positions.map((position) => (
                  <option
                    key={position}
                    value={position}
                    selected={position === selectedDepartment}
                  >
                    {position}
                  </option>
                ))}
              </select>
            )}
            {departments.length !== 0 && (
              <select
                className="select-bordered select"
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                {departments.map((department) => (
                  <option
                    key={department}
                    value={department}
                    selected={department === selectedDepartment}
                  >
                    {department}
                  </option>
                ))}
              </select>
            )}
            <Link href="/dashboard/manager/employees/add">
              <button className="btn-secondary btn gap-2">
                Add New Employee
                <PlusCircleIcon className="h-5 w-5" />
              </button>
            </Link>
          </div>
        </section>
        {filteredEmployees.length === 0 ? (
          <div>0 employees found.</div>
        ) : (
          <div>
            <div className="mt-6 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredEmployees.map((employee) => (
                <EmployeeCard key={employee.id} employee={employee} />
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Dashboard;
