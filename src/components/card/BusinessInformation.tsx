import { useContext } from "react";
import { BusinessContext } from "@contexts/index";

const BusinessInformation = () => {
  const { name, departments } = useContext(BusinessContext);
  return (
    <div className="card glass">
      <div className="card-body">
        <p>Name: {name}</p>
        {departments.map((department) => {
          return <div key={`department-${department}`}>{department}</div>;
        })}
      </div>
    </div>
  );
};

export default BusinessInformation;
