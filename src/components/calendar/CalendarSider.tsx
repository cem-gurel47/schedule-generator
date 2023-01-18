import { useContext } from "react";
import { BusinessContext, CalendarContext } from "@contexts/index";

const CalendarSider = () => {
  const { openingHours, closingHour, openingHour } =
    useContext(BusinessContext);
  const { date } = useContext(CalendarContext);

  if (date && openingHours[date.day()] === "") {
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
    <div className="">
      {businessHours.map((hour, index) => (
        <div key={hour}>
          <div
            className={`flex h-14 items-center justify-center p-4 shadow-xl ${
              index !== businessHours.length - 1 && ""
            }`}
          >
            <span className="text-sm font-medium text-gray-400">{hour}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CalendarSider;
