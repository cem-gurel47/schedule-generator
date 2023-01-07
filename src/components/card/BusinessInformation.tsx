import { useContext } from "react";
import { BusinessContext } from "@contexts/index";
import { BusinessStatisticsCard } from "./index";

const BusinessInformation = () => {
  const { departments } = useContext(BusinessContext);
  return (
    <div className="card bg-base-100 shadow-2xl">
      <BusinessStatisticsCard />
    </div>
  );
};

export default BusinessInformation;
