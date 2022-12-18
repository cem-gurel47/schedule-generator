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
    <div className="flex items-center justify-center w-full border-b-2">
      <div className="text-center bg-secondary text-white py-4 w-full rounded-tl-lg rounded-tr-lg">
        Schedule for {date?.format("dddd DD")}
      </div>
    </div>
  );
};

export default CalendarHeader;
