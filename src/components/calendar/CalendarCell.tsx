import type { Shift } from "@models/types";

type Props = {
  shift: Shift;
  col: number;
};

const CalendarCell = (props: Props) => {
  const { shift, col } = props;
  const { employee, shiftEnd, shiftStart } = shift;

  const calculateGridColumnPositions = () => {
    const businessStart = 9;

    const shiftStartHour = parseInt(shiftStart.split(":")[0] || "0") + 1;
    const shiftEndHour = parseInt(shiftEnd.split(":")[0] || "0") + 2;

    const start = shiftStartHour - businessStart;
    const end = shiftEndHour - businessStart;

    return [start, end];
  };

  const [start, end] = calculateGridColumnPositions();

  const createLinearBackgroundClassName = () => {
    return "bg-base-100";
  };

  return (
    <div
      className={`flex h-full w-full cursor-grab flex-col items-center justify-center rounded-2xl p-2 text-center text-gray-300 shadow-lg ${createLinearBackgroundClassName()}`}
      style={{
        gridRowStart: start,
        gridRowEnd: end,
        gridColumnStart: col,
        gridColumnEnd: col + 1,
      }}
    >
      <p className="text-contrast text-sm">{employee.name}</p>
      <p>
        {shiftStart} - {shiftEnd}
      </p>
    </div>
  );
};

export default CalendarCell;
