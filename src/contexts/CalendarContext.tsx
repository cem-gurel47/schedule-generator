import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { BusinessContext } from "./BusinessContext";
import moment from "moment";
import { useSession } from "next-auth/react";
import { trpc } from "@utils/trpc";
import type { Shift } from "@models/types";

interface CalendarontextInterface {
  isLoading: boolean;
  date: moment.Moment | null;
  data: Shift[][];
  selectedDepartment: string | undefined;
  setSelectedDepartment: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  setData: React.Dispatch<React.SetStateAction<Shift[][]>>;
  setDate: React.Dispatch<React.SetStateAction<moment.Moment>>;
  getData: (day: moment.Moment | null) => void;
}

export const CalendarContext = createContext({} as CalendarontextInterface);

export const CalendarContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { status } = useSession();
  const { departments, isLoading: departmentsLoading } =
    useContext(BusinessContext);
  const [date, setDate] = useState<moment.Moment>(moment());
  const [data, setData] = useState<Shift[][]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<
    string | undefined
  >(undefined);

  const { refetch, isLoading } = trpc.schedule.getScheduleForDate.useQuery(
    { date: date.toDate(), department: selectedDepartment },
    {
      enabled: false,
    }
  );

  const getData = useCallback(async () => {
    if (status === "authenticated") {
      const { data } = await refetch();
      if (data) {
        setData(data);
      }
    }
  }, [refetch, status]);

  useEffect(() => {
    if (departments) {
      setSelectedDepartment(departments[0]);
    }
  }, [departments]);

  useEffect(() => {
    if (!departmentsLoading) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, selectedDepartment, departmentsLoading]);

  return (
    <CalendarContext.Provider
      value={{
        date,
        data,
        selectedDepartment,
        setSelectedDepartment,
        setData,
        setDate,
        getData,
        isLoading,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
