import EmployeeHeader from "./EmployeeHeader";
import ManagerHeader from "./ManagerHeader";

const DashboardHeader = () => {
  const role = "manager";

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (role === "employee") {
    return <EmployeeHeader />;
  }
  return <ManagerHeader />;
};

export default DashboardHeader;
