import { useState } from "react";
import type { Employee } from "@models/types";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { trpc } from "@utils/trpc";

type Props = {
  employee: Employee;
};

const EmployeeHours = ({ employee }: Props) => {
  const { minHours, maxHours } = employee;
  const [localMinHours, setLocalMinHours] = useState(minHours);
  const [localMaxHours, setLocalMaxHours] = useState(maxHours);
  const { mutate, isLoading } =
    trpc.employees.updateEmployeeHourRange.useMutation();
  const disabled =
    isLoading || (localMinHours === minHours && localMaxHours === maxHours);

  return (
    <div className="card h-full bg-base-100 shadow-xl">
      <div className="card-body">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutate({
              id: employee.id,
              minHours: localMinHours,
              maxHours: localMaxHours,
            });
          }}
        >
          <div className="form-control">
            <label className="label flex justify-start gap-2">
              <span className="label-text">Min Hours</span>
              <div
                className=" tooltip tooltip-right z-50"
                data-tip="Priority will determine how much our algorithm is likely to give a shift to an employee. Higher numbers mean a higher priority."
              >
                <InformationCircleIcon className="h-6 w-6 cursor-pointer" />
              </div>
            </label>
            <input
              min={0}
              required
              type="number"
              className="input-bordered input"
              value={localMinHours}
              onChange={(e) => {
                setLocalMinHours(parseInt(e.target.value));
                setLocalMaxHours(
                  Math.max(localMaxHours, parseInt(e.target.value))
                );
              }}
            />
          </div>
          <div className="form-control">
            <label className="label flex justify-start gap-2">
              <span className="label-text">Max Hours</span>
            </label>
            <input
              min={localMinHours}
              required
              type="number"
              className="input-bordered input"
              value={localMaxHours}
              onChange={(e) => setLocalMaxHours(parseInt(e.target.value))}
            />
          </div>
          <button
            className={`btn-primary btn mt-2 w-full ${isLoading && "loading"}`}
            type="submit"
            disabled={disabled}
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeHours;
