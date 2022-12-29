import { createContext, useContext, useEffect } from "react";
import { trpc } from "@utils/trpc";
import { useSession } from "next-auth/react";
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
  const { status } = useSession();
  const { date } = useContext(CalendarContext);
  const { data, isLoading, refetch } = trpc.business.getBusiness.useQuery(
    undefined,
    {
      enabled: false,
    }
  );
  const dayOfWeek = date ? date.day() : 0;

  useEffect(() => {
    if (status === "authenticated") {
      refetch();
    }
  }, [status, refetch]);

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
              isLoading: status === "authenticated", // if we are authenticated, we are loading. This way guests don't see the loading screen
              isClosed: false,
              departments: [],
            }
      }
    >
      {children}
    </BusinessContext.Provider>
  );
};
