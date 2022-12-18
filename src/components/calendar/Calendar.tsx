import CalendarHeader from "./CalendarHeader";
import CalendarBody from "./CalendarBody";

const Calendar = () => {
  return (
    <div className="h-full pb-24">
      <div className="w-full border border-secondary rounded-xl mt-12">
        <CalendarHeader />
        <CalendarBody />
      </div>
    </div>
  );
};

export default Calendar;
