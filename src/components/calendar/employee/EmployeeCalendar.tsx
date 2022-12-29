import CalendarHeader from "./EmployeeCalendarHeader";
import CalendarBody from "../CalendarBody";

type Props = {
  type: "profile" | "default";
  name?: string;
};

const Calendar = (props: Props) => {
  return (
    <div className=" pb-24">
      <div className="mt-12 w-full rounded-xl border border-secondary">
        <CalendarHeader {...props} />
        <CalendarBody />
      </div>
    </div>
  );
};

export default Calendar;
