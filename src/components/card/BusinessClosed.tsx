import { useContext } from "react";
import {
  XCircleIcon,
  ArrowRightCircleIcon,
  ArrowLeftCircleIcon,
} from "@heroicons/react/24/solid";
import { CalendarContext } from "@contexts/index";

const BusinessClosed = () => {
  const { date, setDate } = useContext(CalendarContext);

  const handlePrev = () => {
    if (date) {
      const prevDate = date.clone().subtract(1, "day");
      setDate(prevDate);
    }
  };

  const handleNext = () => {
    if (date) {
      const nextDate = date.clone().add(1, "day");
      setDate(nextDate);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full  py-24">
      <XCircleIcon className="w-24 h-24 text-secondary bg-white rounded-full" />
      <p className="text-lg font-medium text-accent mt-3">
        Business is closed!
      </p>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <button
          className="btn btn-secondary btn-outline rounded-md px-4 py-2 gap-2"
          onClick={handlePrev}
        >
          <ArrowLeftCircleIcon className="w-5 h-5" />
          Visit Previous Day
        </button>
        <button
          className="btn btn-secondary btn-outline rounded-md px-4 py-2 gap-2"
          onClick={handleNext}
        >
          Visit Next Day
          <ArrowRightCircleIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default BusinessClosed;
