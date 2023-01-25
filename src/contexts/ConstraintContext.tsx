import { useState } from "react";
import { createContext, useEffect } from "react";
import { useSession } from "next-auth/react";
import { trpc } from "@utils/trpc";
import type { Constraint } from "@models/types";

interface EmployeeContextInterface {
  isLoading: boolean;
  constraints: Constraint[];
  setConstraints: React.Dispatch<React.SetStateAction<Constraint[]>>;
}

export const ConstraintContext = createContext({} as EmployeeContextInterface);

export const ConstraintContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [constraints, setConstraints] = useState<Constraint[]>([]);
  const { status } = useSession();
  const { isLoading, refetch } = trpc.constraint.getAllConstraints.useQuery(
    undefined,
    {
      enabled: false,
      onSuccess: (data) => {
        setConstraints(data);
      },
    }
  );

  useEffect(() => {
    if (status === "authenticated") {
      refetch();
    }
  }, [refetch, status]);

  return (
    <ConstraintContext.Provider
      value={{ isLoading, constraints, setConstraints }}
    >
      {children}
    </ConstraintContext.Provider>
  );
};
