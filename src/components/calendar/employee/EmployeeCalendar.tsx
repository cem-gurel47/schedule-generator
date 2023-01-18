import CalendarHeader from "./EmployeeCalendarHeader";
import CalendarBody from "../CalendarBody";

type Props = {
  type: "profile" | "default";
  name?: string;
};

const Calendar = (props: Props) => {
  return (
    <div className=" pb-24">
      <div className="mt-12 w-full bg-base-100 shadow-2xl">
        <CalendarHeader {...props} />
        <CalendarBody />
      </div>
    </div>
  );
};

export default Calendar;
