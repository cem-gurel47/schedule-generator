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
    <div className="flex w-full items-center justify-center">
      <div className="w-full py-4 text-center text-xl text-secondary">
        <p>
          {type === "default"
            ? `Schedule for ${date?.format("dddd DD")}`
            : `${name}'s schedule for ${date?.format("dddd DD")}`}
        </p>
      </div>
    </div>
  );
};

export default CalendarHeader;
