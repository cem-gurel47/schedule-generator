import { createContext, useContext, useEffect, useState } from "react";
import { trpc } from "@utils/trpc";
import { useSession } from "next-auth/react";
import { CalendarContext } from "./CalendarContext";
import { useRouter } from "next/router";

interface BusinessContextInterface {
  name: string;
  id: string;
  openingHours: string[]; // opening hours for each day of the week. empty string means closed
  closingHours: string[];
  openingHour: string;
  closingHour: string;
  isClosed: boolean;
  image: string | null;
  isLoading: boolean;
  departments: string[];
  isMissingInformation: boolean;
}

export const BusinessContext = createContext({} as BusinessContextInterface);

export const BusinessContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const session = useSession();
  const { date } = useContext(CalendarContext);
  const { data, isLoading, refetch } = trpc.business.getBusiness.useQuery(
    undefined,
    {
      enabled: false,
    }
  );
  const dayOfWeek = date ? date.day() : 0;
  const [isMissingInformation, setIsMissingInformation] = useState(false);

  useEffect(() => {
    if (session.status === "authenticated") {
      refetch();
    }
  }, [session, refetch]);

  useEffect(() => {
    if (data) {
      if (
        (data.openingHours.length === 0 ||
          data.closingHours.length === 0 ||
          data.image === null) &&
        router.pathname !== "/dashboard/manager/management"
      ) {
        setIsMissingInformation(true);
        router.push("/dashboard/manager/management");
      }
    }
  }, [router, data]);

  return (
    <BusinessContext.Provider
      value={
        data
          ? {
              ...data,
              isClosed: data.openingHours[dayOfWeek] === null,
              isLoading,
              openingHour: data.openingHours[dayOfWeek] || "",
              closingHour: data.closingHours[dayOfWeek] || "",
              isMissingInformation,
            }
          : {
              name: "",
              id: "",
              openingHours: [],
              closingHours: [],
              openingHour: "",
              closingHour: "",
              image: "",
              isLoading: session.status === "authenticated", // if we are authenticated, we are loading. This way guests don't see the loading screen
              isClosed: false,
              departments: [],
              isMissingInformation,
            }
      }
    >
      {children}
    </BusinessContext.Provider>
  );
};
