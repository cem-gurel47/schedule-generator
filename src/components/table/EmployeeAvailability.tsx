import React from "react";
import { DAYS } from "@models/constants";

type Props = {
  hours: string[][];
};

const EmployeeAvailability = ({ hours }: Props) => {
  return (
    <table className="table-zebra table w-full">
      <thead>
        <tr>
          <th>Day</th>
          <th>Ready to start</th>
          <th>Ready to work until</th>
        </tr>
      </thead>
      <tbody>
        {DAYS.map((day, index) => {
          return (
            <tr key={`business-hours-${index}`}>
              <td>{day}</td>
              <td>{hours[index]?.at(0) || "Not Available"}</td>
              <td>{hours[index]?.at(1) || "Not Available"}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default EmployeeAvailability;
