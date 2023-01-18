import { useContext } from "react";
import { CalendarContext, BusinessContext } from "@contexts/index";
import CalendarCell from "./CalendarCell";
import { BusinessClosedCard } from "@/components/card";

const CalendarContent = () => {
  const { data, isLoading, date } = useContext(CalendarContext);
  const { openingHours } = useContext(BusinessContext);

  if (date && openingHours[date.day()] === "") {
    return <BusinessClosedCard />;
  }

  return (
    <div className=" w-full bg-base-200">
      {isLoading ? (
        <div className="flex h-96 items-center justify-center">
          <div className="h-24 w-24 animate-pulse rounded-full border-8 border-t-8 border-secondary ease-linear"></div>
        </div>
      ) : (
        <div
          className="grid grid-cols-7 gap-2 p-1"
          style={{
            gridTemplateRows: "repeat(9, 48px)",
          }}
        >
          {data.map((ShiftColumn, index) => {
            return ShiftColumn.map((shift) => (
              <CalendarCell
                key={`calendar-cell-${shift.employee.id}`}
                shift={shift}
                col={index + 1}
              />
            ));
          })}
        </div>
      )}
    </div>
  );
};

export default CalendarContent;
