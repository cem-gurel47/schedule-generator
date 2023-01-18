import { createContext, useEffect } from "react";
import type { Employee } from "@models/types";
import { useSession } from "next-auth/react";
import { trpc } from "@utils/trpc";

interface EmployeeContextInterface {
  isLoading: boolean;
  employee: Employee | null | undefined;
}

export const EmployeeContext = createContext({} as EmployeeContextInterface);

export const EmployeeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { status } = useSession();
  const { data, isLoading, refetch } = trpc.employees.getEmployee.useQuery(
    {
      id: "",
    },
    {
      enabled: false,
    }
  );

  useEffect(() => {
    if (status === "authenticated") {
      refetch();
    }
  }, [refetch, status]);

  return (
    <EmployeeContext.Provider value={{ isLoading, employee: data }}>
      {children}
    </EmployeeContext.Provider>
  );
};
