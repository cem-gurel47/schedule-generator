import EmployeeHeader from "./EmployeeHeader";
import ManagerHeader from "./ManagerHeader";
import { useSession } from "next-auth/react";

const DashboardHeader = () => {
  const { data } = useSession();

  if (data?.user?.role !== "employee") {
    return <EmployeeHeader />;
  }
  return <ManagerHeader />;
};

export default DashboardHeader;
