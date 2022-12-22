import { useContext } from "react";
import { BusinessContext } from "@contexts/index";
import { DAYS } from "@models/constants";

const BusinessHours = () => {
  const { openingHours, closingHours } = useContext(BusinessContext);
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Day</th>
            <th>Opens at</th>
            <th>Closes at</th>
          </tr>
        </thead>
        <tbody>
          {DAYS.map((day, index) => {
            return (
              <tr key={`business-hours-${index}`}>
                <td>{day}</td>
                <td>{openingHours[index] || "Closed"}</td>
                <td>{closingHours[index] || "Closed"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BusinessHours;
