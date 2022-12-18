import { useState } from "react";
import { RequestStatus } from "@models/enums";
import {
  CheckCircleIcon,
  XCircleIcon,
  ArrowRightCircleIcon,
  CalendarDaysIcon,
  InformationCircleIcon,
  ArrowsRightLeftIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";

type Props = {
  id: string;
  employee: {
    id: string;
    name: string;
    email: string;
    phone: string;
    position: string;
  };
  details: {
    status: RequestStatus;
    oldShift: string;
    newShift: string;
    requestDate: string;
    description: string;
    swapWith: {
      id: string;
      name: string;
      email: string;
      phone: string;
      position: string;
    };
  };
};

function PersonCard({ name, position }: { name: string; position: string }) {
  return (
    <div className="flex items-center space-x-3 rounded-md px-4 py-2">
      <UserCircleIcon className="flex-shrink-0 h-8 w-8 text-primary" />
      <div className="text-sm text-center font-medium text-white">
        <p>{name}</p>
        <p className="text-secondary">{position}</p>
      </div>
    </div>
  );
}

function ShiftSwapRequest(props: Props) {
  const formatter = new Intl.RelativeTimeFormat("en", {
    style: "long",
  });
  const dateTimeFormatter = new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  const { employee, details } = props;
  const { status, oldShift, newShift, requestDate, description, swapWith } =
    details;
  const { name, position } = employee;
  const [timeDifference, setTimeDifference] = useState(
    new Date().getTime() - new Date(requestDate).getTime()
  );

  const timeDifferenceInterval = setInterval(() => {
    setTimeDifference(new Date().getTime() - new Date(requestDate).getTime());
    // update time difference every minute
    return () => clearInterval(timeDifferenceInterval);
  }, 60000);

  const calculateTimeDiff = () => {
    const minuteInMs = 1000 * 60;
    const hourInMs = minuteInMs * 60;
    const dayInMs = hourInMs * 24;
    const yearInMs = dayInMs * 365;

    if (timeDifference > yearInMs) {
      return formatter.format(-Math.floor(timeDifference / yearInMs), "year");
    }
    if (timeDifference > dayInMs) {
      return formatter.format(-Math.floor(timeDifference / dayInMs), "day");
    }
    if (timeDifference > hourInMs) {
      return formatter.format(-Math.floor(timeDifference / hourInMs), "hour");
    }
    if (timeDifference > minuteInMs) {
      return formatter.format(
        -Math.floor(timeDifference / minuteInMs),
        "minute"
      );
    }
    return formatter.format(Math.floor(timeDifference / 1000), "second");
  };

  return (
    <div className="card bg-neutral font-medium shadow-lg p-4">
      <div className="flex justify-center items-center">
        <div className="flex justify-between items-center space-x-4">
          <PersonCard name={name} position={position} />
          <ArrowsRightLeftIcon className="h-6 w-6 text-primary" />
          <PersonCard name={swapWith.name} position={swapWith.position} />
        </div>
      </div>

      <div className="flex flex-col">
        <p className=" text-accent">{name}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center rounded-full bg-zinc-100 shadow-sm py-2 px-1 w-full">
            <CalendarDaysIcon className="h-10 w-10 text-gray-700 p-2" />
            <p className="text-gray-700">
              {dateTimeFormatter.format(new Date(oldShift))}
            </p>
          </div>
          <ArrowRightCircleIcon className="h-20 w-20 text-secondary p-2" />
          <div className="flex items-center rounded-full bg-zinc-100 shadow-sm py-2 px-1 w-full">
            <CalendarDaysIcon className="h-10 w-10 text-gray-700 p-2" />
            <p className="text-gray-700">
              {dateTimeFormatter.format(new Date(newShift))}
            </p>
          </div>
        </div>
        <p className=" text-accent">{swapWith.name}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center rounded-full bg-zinc-100 shadow-sm py-2 px-1 w-full">
            <CalendarDaysIcon className="h-10 w-10 text-gray-700 p-2" />
            <p className="text-gray-700">
              {dateTimeFormatter.format(new Date(newShift))}
            </p>
          </div>
          <ArrowRightCircleIcon className="h-20 w-20 text-secondary p-2" />
          <div className="flex items-center rounded-full bg-zinc-100 shadow-sm py-2 px-1 w-full">
            <CalendarDaysIcon className="h-10 w-10 text-gray-700 p-2" />
            <p className="text-gray-700">
              {dateTimeFormatter.format(new Date(oldShift))}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center py-2 rounded-full bg-zinc-100 shadow-sm mb-3">
        <InformationCircleIcon className="h-12 w-12 text-gray-700 p-2 mr-1" />
        <p className="text-gray-700  font-light text-sm">
          {description || "No description provided. "}
        </p>
      </div>

      {status === RequestStatus.PENDING ? (
        <div className="grid grid-cols-2 gap-2 mt-2">
          <button className="flex rounded-full justify-center items-center bg-green-500 text-white px-2 py-2 transition-transform duration-100 hover:scale-105 hover:bg-green-600">
            Approve
            <CheckCircleIcon className="h-6 w-6 text-white ml-2" />
          </button>
          <button className="flex justify-center rounded-full items-center bg-red-500 text-white px-2 py-2 transition-transform duration-100 hover:scale-105 hover:bg-red-600">
            Reject
            <XCircleIcon className="h-6 w-6 text-white ml-2" />
          </button>
        </div>
      ) : (
        <div className="flex flex-col text-center mt-2 cursor-default">
          {status === RequestStatus.APPROVED ? (
            <div className="flex rounded-full justify-center items-center bg-green-500 text-white px-2 py-2 ">
              Approved
              <CheckCircleIcon className="h-6 w-6 text-white ml-2" />
            </div>
          ) : (
            <div className="flex justify-center rounded-full items-center bg-red-500 text-white px-2 py-2">
              Rejected
              <XCircleIcon className="h-6 w-6 text-white ml-2" />
            </div>
          )}
        </div>
      )}
      <p className="text-sm text-secondary text-right mt-2">
        {`Requested ${calculateTimeDiff()}`}
      </p>
    </div>
  );
}

export default ShiftSwapRequest;
