import CalendarSider from "./CalendarSider";
import CalendarContent from "./CalendarContent";

const CalendarBody = () => {
  return (
    <div className="flex">
      <CalendarSider />
      <CalendarContent />
    </div>
  );
};

export default CalendarBody;
