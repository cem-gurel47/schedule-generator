import { useContext } from "react";
import { BusinessContext } from "@contexts/BusinessContext";

const CalendarSider = () => {
  const { openingHour, closingHour, isClosed } = useContext(BusinessContext);

  if (isClosed || !openingHour || !closingHour) {
    return null;
  }

  const getBusinessHours = () => {
    const [startingHour, startingMinutes] = openingHour.split(":");
    const [endingHour, endingMinutes] = closingHour.split(":");

    const hours = [];
    const startingHourNumber = parseInt(startingHour || "0");
    const endingHourNumber = parseInt(endingHour || "0");

    for (let i = startingHourNumber; i <= endingHourNumber; i++) {
      if (i === startingHourNumber) {
        hours.push(`${i}:${startingMinutes}`);
      } else if (i === endingHourNumber) {
        hours.push(`${i}:${endingMinutes}`);
      } else {
        hours.push(`${i}:00`);
      }
    }

    return hours;
  };

  const businessHours = getBusinessHours();

  return (
    <div className=" border-r-2">
      {businessHours.map((hour, index) => (
        <div key={hour}>
          <div
            className={`flex justify-center items-center h-14 p-4 bg-secondary ${
              index === businessHours.length - 1
                ? "rounded-bl-lg"
                : "border-b-2"
            }`}
          >
            <span className="text-sm font-medium text-white">{hour}:00</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CalendarSider;
