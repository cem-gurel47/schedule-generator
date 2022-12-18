import { useContext } from "react";
import { CalendarContext, BusinessContext } from "@contexts/index";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import CalendarCell from "./CalendarCell";
import { BusinessClosedCard } from "@components/Card";

const CalendarContent = () => {
  const { data, loading } = useContext(CalendarContext);
  const { isClosed } = useContext(BusinessContext);
  const [parent] = useAutoAnimate<HTMLDivElement>();

  if (isClosed) {
    return <BusinessClosedCard />;
  }

  return (
    <div className=" w-full bg-base-200">
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="animate-pulse ease-linear rounded-full border-8 border-t-8 border-secondary h-24 w-24"></div>
        </div>
      ) : (
        <div
          ref={parent}
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
