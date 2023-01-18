import { useContext, useMemo } from "react";
import { CalendarContext } from "@contexts/index";
import DirectionalButton from "@/components/button/DirectionButton";
import moment from "moment";

const CalendarOptions = () => {
  const { date, setDate } = useContext(CalendarContext);
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
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="tooltip" data-tip="Previous week">
          <DirectionalButton direction="left" onClick={handlePrev} />
        </div>
        <div className="tooltip" data-tip="Next week">
          <DirectionalButton direction="right" onClick={handleNext} />
        </div>
        <p className=" text-xl text-gray-400">{`${date?.format("MMMM")} ${date
          ?.clone()
          .startOf("week")
          .format("DD")} - ${date?.clone().endOf("week").format("MMMM")} ${date
          ?.clone()
          .endOf("week")
          .format("DD")}`}</p>
      </div>

      <div className="flex gap-4">
        <select
          className="min-w-32 select-bordered select"
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
      </div>
    </div>
  );
};

export default CalendarOptions;
