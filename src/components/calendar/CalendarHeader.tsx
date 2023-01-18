import { useContext, useEffect } from "react";
import { CalendarContext } from "@contexts/CalendarContext";
import moment from "moment";

const CalendarHeader = () => {
  const { date, setDate } = useContext(CalendarContext);

  useEffect(() => {
    if (!date) {
      setDate(moment());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex w-full items-center justify-center border-b-2 border-secondary">
      <div className="w-full bg-secondary py-4 text-center">
        Schedule for {date?.format("dddd DD")}
      </div>
    </div>
  );
};

export default CalendarHeader;
