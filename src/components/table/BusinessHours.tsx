import { useContext, useState } from "react";
import { BusinessContext } from "@contexts/index";
import { DAYS } from "@models/constants";
import { trpc } from "@utils/trpc";
import { SuccessAlert } from "@components/alert/index";

const BusinessHours = () => {
  const { openingHours, closingHours } = useContext(BusinessContext);
  const [localOpeningHours, setLocalOpeningHours] = useState(openingHours);
  const [localClosingHours, setLocalClosingHours] = useState(closingHours);
  const isChanged =
    openingHours !== localOpeningHours || closingHours !== localClosingHours;
  const { mutate, isLoading, data } =
    trpc.business.updateBusinessHours.useMutation();

  const saveNewHours = () => {
    const newOpeningHours = new Array(7).fill(undefined).map((_, index) => {
      if (localOpeningHours[index]) {
        return localOpeningHours[index] as string;
      }
      return "";
    });
    const newClosingHours = new Array(7).fill(undefined).map((_, index) => {
      if (localClosingHours[index]) {
        return localClosingHours[index] as string;
      }
      return "";
    });

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
            <th>Opens at</th>
            <th>Closes at</th>
            <th>Closed</th>
          </tr>
        </thead>
        <tbody>
          {DAYS.map((day, index) => {
            const isClosed =
              !localOpeningHours[index] || !localClosingHours[index];
            return (
              <tr key={`business-hours-${index}`}>
                <td>{day}</td>
                <td>
                  <input
                    disabled={isClosed}
                    type="time"
                    className="input-bordered input"
                    value={localOpeningHours[index] || ""}
                    onChange={(e) => {
                      const newOpeningHours = [...localOpeningHours];
                      newOpeningHours[index] = e.target.value;
                      setLocalOpeningHours(newOpeningHours);
                    }}
                  />
                </td>
                <td>
                  <input
                    disabled={isClosed}
                    type="time"
                    className="input-bordered input"
                    value={localClosingHours[index] || ""}
                    onChange={(e) => {
                      const newClosingHours = [...localClosingHours];
                      newClosingHours[index] = e.target.value;
                      setLocalClosingHours(newClosingHours);
                    }}
                  />
                </td>
                <td className="flex h-full justify-center">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-lg m-2"
                    checked={isClosed}
                    onChange={(e) => {
                      const newOpeningHours = [...localOpeningHours];
                      const newClosingHours = [...localClosingHours];
                      if (e.target.checked) {
                        newOpeningHours[index] = "";
                        newClosingHours[index] = "";
                      } else {
                        newOpeningHours[index] = "09:00";
                        newClosingHours[index] = "17:00";
                      }
                      setLocalOpeningHours(newOpeningHours);
                      setLocalClosingHours(newClosingHours);
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

export default BusinessHours;
