import { useContext, useEffect } from "react";
import { CalendarContext } from "@contexts/CalendarContext";
import moment from "moment";

type Props = {
  type: "profile" | "default";
  name?: string;
};

const CalendarHeader = ({ type, name }: Props) => {
  const { date, setDate } = useContext(CalendarContext);

  useEffect(() => {
    if (!date) {
      setDate(moment());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex w-full items-center justify-center border-b-2">
      <div className="w-full rounded-tl-lg rounded-tr-lg bg-secondary py-4 text-center text-white">
        {type === "default"
          ? `Schedule for ${date?.format("dddd DD")}`
          : `${name}'s schedule for ${date?.format("dddd DD")}`}
      </div>
    </div>
  );
};

export default CalendarHeader;
