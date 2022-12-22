import { createContext, useContext } from "react";
import { trpc } from "@utils/trpc";
import { CalendarContext } from "./CalendarContext";

interface BusinessContextInterface {
  name: string;
  id: string;
  openingHours: (string | null)[]; // opening hours for each day of the week. Null means closed
  closingHours: (string | null)[]; // closing hours for each day of the week. Null means closed
  openingHour: string | null;
  closingHour: string | null;
  isClosed: boolean;
  logoURL: string;
  isLoading: boolean;
  departments: string[];
}

export const BusinessContext = createContext({} as BusinessContextInterface);

export const BusinessContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { date } = useContext(CalendarContext);
  const { data, isLoading } = trpc.business.getBusiness.useQuery();
  const dayOfWeek = date ? date.day() : 0;

  return (
    <BusinessContext.Provider
      value={
        data
          ? {
              ...data,
              openingHour: data.openingHours[dayOfWeek] || null,
              closingHour: data.closingHours[dayOfWeek] || null,
              isClosed:
                !data.openingHours[dayOfWeek] || !data.closingHours[dayOfWeek],
              isLoading,
            }
          : {
              name: "",
              id: "",
              openingHours: [],
              closingHours: [],
              openingHour: null,
              closingHour: null,
              logoURL: "",
              isLoading: true,
              isClosed: false,
              departments: [],
            }
      }
    >
      {children}
    </BusinessContext.Provider>
  );
};
