import { useState } from "react";
import { DAYS } from "@models/constants";
import { trpc } from "@utils/trpc";
import { SuccessAlert } from "@components/alert/index";
import type { Employee } from "@models/types";

type Props = {
  employee: Employee;
};

const EmployeeAvailabilityInput = (props: Props) => {
  const { employee } = props;
  const { startingHours, endingHours } = employee;
  const [localStartingHours, setLocalStartingHours] = useState(startingHours);
  const [localEndingHours, setLocalEndingHours] = useState(endingHours);
  const isChanged =
    startingHours !== localStartingHours || endingHours !== localEndingHours;
  const { mutate, isLoading, data } =
    trpc.business.updateBusinessHours.useMutation({});

  const saveNewHours = () => {
    const newOpeningHours = new Array(7).fill(undefined).map((_, index) => {
      if (localStartingHours[index]) {
        return localStartingHours[index] as string;
      }
      return "";
    });
    const newClosingHours = new Array(7).fill(undefined).map((_, index) => {
      if (localEndingHours[index]) {
        return localEndingHours[index] as string;
      }
      return "";
    });

    console.log(newOpeningHours, newClosingHours);

    mutate({
      openingHours: newOpeningHours,
      closingHours: newClosingHours,
    });
  };

  return (
    <div className="col-span-2 overflow-x-auto">
      <table className="table-zebra table w-full">
        <thead>
          <tr>
            <th>Day</th>
            <th>Ready to start working</th>
            <th>Ready to work until</th>
            <th className=" text-center">Not Available</th>
          </tr>
        </thead>
        <tbody>
          {DAYS.map((day, index) => {
            const isClosed =
              !localStartingHours[index] || !localEndingHours[index];
            return (
              <tr key={`business-hours-${index}`}>
                <td>{day}</td>
                <td>
                  <input
                    disabled={isClosed}
                    type="time"
                    className="input-bordered input"
                    value={localStartingHours[index] || ""}
                    onChange={(e) => {
                      const newOpeningHours = [...localStartingHours];
                      newOpeningHours[index] = e.target.value;
                      setLocalStartingHours(newOpeningHours);
                    }}
                  />
                </td>
                <td>
                  <input
                    disabled={isClosed}
                    type="time"
                    className="input-bordered input"
                    value={localEndingHours[index] || ""}
                    onChange={(e) => {
                      const newClosingHours = [...localEndingHours];
                      newClosingHours[index] = e.target.value;
                      setLocalEndingHours(newClosingHours);
                    }}
                  />
                </td>
                <td className="flex h-full justify-center">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-lg m-2"
                    checked={isClosed}
                    onChange={(e) => {
                      const newOpeningHours = [...localStartingHours];
                      const newClosingHours = [...localEndingHours];
                      if (e.target.checked) {
                        newOpeningHours[index] = "";
                        newClosingHours[index] = "";
                      } else {
                        newOpeningHours[index] = "09:00";
                        newClosingHours[index] = "17:00";
                      }
                      setLocalStartingHours(newOpeningHours);
                      setLocalEndingHours(newClosingHours);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button
        className={`btn-primary btn w-full ${isLoading && "loading"}}`}
        disabled={!isChanged}
        onClick={saveNewHours}
      >
        Save New Hours
      </button>
      {data && (
        <SuccessAlert
          title="Success!"
          description="Business hours updated successfully"
        />
      )}
    </div>
  );
};

export default EmployeeAvailabilityInput;
