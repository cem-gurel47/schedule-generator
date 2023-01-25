import React, { useState, useContext } from "react";
import { BusinessContext } from "@contexts/index";
import { trpc } from "@utils/trpc";
import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import type { Availability } from "@models/types";

type Props = {
  dayOfWeek: number;
  setAvailabilities: React.Dispatch<React.SetStateAction<Availability[]>>;
};

const AddAvailability = (props: Props) => {
  const { dayOfWeek, setAvailabilities } = props;
  const { openingHours, closingHours } = useContext(BusinessContext);
  const [inputMode, setInputMode] = useState(false);
  const { mutate, isLoading } = trpc.employees.addAvailability.useMutation();
  const disabled = !openingHours[dayOfWeek] && !closingHours[dayOfWeek];

  const handleAddNew = (start: string, end: string) => {
    mutate(
      {
        dayOfWeek: props.dayOfWeek,
        start,
        end,
      },
      {
        onSuccess: (data) => {
          setAvailabilities((prev) => [...prev, data]);
          setInputMode(false);
        },
      }
    );
  };

  if (inputMode) {
    return (
      <div className="card bg-base-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const start = formData.get("start")?.toString();
            const end = formData.get("end")?.toString();
            if (!start || !end) {
              return;
            }
            handleAddNew(start, end);
          }}
        >
          <label className="label">
            <span className="label-text">From:</span>
          </label>
          <input
            autoFocus
            name="start"
            required
            type="time"
            className="input w-full"
            min={openingHours[dayOfWeek]}
            defaultValue={openingHours[dayOfWeek]}
          />
          <label className="label">
            <span className="label-text">To:</span>
          </label>

          <input
            name="end"
            required
            type="time"
            className="input w-full"
            max={closingHours[dayOfWeek]}
            defaultValue={closingHours[dayOfWeek]}
          />

          <div className="mt-2 grid grid-cols-2 gap-1">
            <button
              className={`btn-outline btn-primary btn col-span-1${
                isLoading && "loading"
              }`}
              type="submit"
            >
              Add
            </button>
            <button
              className="btn-outline btn-error btn col-span-1"
              onClick={() => setInputMode(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <button
      {...props}
      className="btn-ghost btn-block btn h-auto rounded-md bg-base-200 py-6"
      onClick={() => setInputMode(true)}
      disabled={disabled}
    >
      {disabled ? (
        <XCircleIcon className="h-12 w-12" />
      ) : (
        <PlusCircleIcon className="h-12 w-12" />
      )}
    </button>
  );
};

export default AddAvailability;
