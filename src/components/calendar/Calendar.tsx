import CalendarHeader from "./CalendarHeader";
import CalendarBody from "./CalendarBody";

const Calendar = () => {
  return (
    <div className="pb-24">
      <div className="mt-12 w-full bg-base-100 shadow-2xl">
        <CalendarHeader />
        <CalendarBody />
      </div>
    </div>
  );
};

export default Calendar;
