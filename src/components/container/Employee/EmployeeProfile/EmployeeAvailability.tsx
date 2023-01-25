import { useState } from "react";
import type { Availability } from "@models/types";
import { DAYS } from "@models/constants";
import AddAvailabilityButton from "./AddAvailability";
import AvailabilityCard from "./Availability";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type Props = {
  availabilities: Availability[];
};

const EmployeeAvailability = (props: Props) => {
  const { availabilities } = props;
  const [availabilitiesCopy, setAvailabilitiesCopy] =
    useState<Availability[]>(availabilities);
  const [parent] = useAutoAnimate<HTMLUListElement>();

  return (
    <div className="h-full w-full rounded-xl bg-base-200 p-4 shadow-2xl">
      <h2>Availability Table</h2>
      <div className="mt-2 grid grid-cols-7 pt-2">
        {DAYS.map((day, index) => (
          <div key={day} className="col-span-1">
            <div className="bg-base-100 p-2 text-center transition duration-150 ease-in-out hover:text-primary">
              <p className=" cursor-default">{day}</p>
            </div>
            <ul ref={parent}>
              {availabilitiesCopy
                .filter((a) => a.dayOfWeek === index)
                .map((availability) => (
                  <AvailabilityCard
                    availability={availability}
                    setAvailabilities={setAvailabilitiesCopy}
                    key={availability.id}
                  />
                ))}
            </ul>
            <AddAvailabilityButton
              dayOfWeek={index}
              setAvailabilities={setAvailabilitiesCopy}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeAvailability;
