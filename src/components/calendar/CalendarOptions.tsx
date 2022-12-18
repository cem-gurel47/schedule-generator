import { useContext, useMemo } from "react";
import { CalendarContext, BusinessContext } from "@contexts/index";
import DirectionalButton from "@/components/Button/DirectionButton";
import moment from "moment";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

const CalendarOptions = () => {
  const { date, setDate, getData, selectedDepartment, setSelectedDepartment } =
    useContext(CalendarContext);
  const { departments } = useContext(BusinessContext);
  const WEEK_DAYS = useMemo(() => new Array(7).fill("").map((_, i) => i), []);

  const handleNext = () => {
    if (date) {
      const nextDate = date.clone().add(1, "week");
      setDate(nextDate);
    }
  };

  const handlePrev = () => {
    if (date) {
      const prevDate = date.clone().subtract(1, "week");
      setDate(prevDate);
    }
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <div className="tooltip" data-tip="Previous week">
          <DirectionalButton direction="left" onClick={handlePrev} />
        </div>
        <div className="tooltip" data-tip="Next week">
          <DirectionalButton direction="right" onClick={handleNext} />
        </div>
        <p className=" text-secondary text-xl font-medium">{`${date?.format(
          "MMMM"
        )} ${date?.clone().startOf("week").format("DD")}-${date
          ?.clone()
          .endOf("week")
          .format("DD")}`}</p>
      </div>

      <div className="flex gap-4">
        <select
          defaultValue={selectedDepartment}
          className="select select-bordered min-w-32"
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          {departments.map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>
        <select
          className="select select-bordered min-w-32"
          onChange={(e) =>
            setDate(
              date?.clone().set("day", Number(e.target.value)) || moment()
            )
          }
        >
          {WEEK_DAYS.map((dayIndex) => (
            <option
              key={`week-day-${dayIndex}`}
              value={dayIndex}
              selected={
                date?.format("dddd") === moment().day(dayIndex).format("dddd")
              }
            >
              {moment().clone().day(dayIndex).format("dddd")}
            </option>
          ))}
        </select>
        <button
          onClick={() => getData(date)}
          className="btn btn-secondary gap-2"
        >
          Generate Work Schedule
          <PlusCircleIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CalendarOptions;
