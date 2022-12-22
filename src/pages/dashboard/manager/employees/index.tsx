import type { NextPage } from "next";
import Head from "next/head";
import { useContext, useState, useEffect } from "react";
import { BusinessContext } from "@contexts/index";
import { trpc } from "@utils/trpc";
import { EmployeeCard } from "@components/card/index";

const Dashboard: NextPage = () => {
  const { departments } = useContext(BusinessContext);

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
  const { data: positions } = trpc.business.getPositions.useQuery({
    department: selectedDepartment,
  });

  useEffect(() => {
    if (selectedDepartment) {
      refetch();
    }
  }, [refetch, selectedDepartment, selectedPosition]);

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
              className="input-primary input"
            />
            {positions && (
              <select
                className="select-primary select"
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
            {departments && (
              <select
                className="select-primary select"
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
          </div>
        </section>
        {isLoading || !employees ? (
          <div>Loading...</div>
        ) : (
          <div>
            <div className="mt-6 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {employees.map((employee) => (
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
