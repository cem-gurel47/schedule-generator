import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { BusinessContext } from "./BusinessContext";
import moment from "moment";
import { trpc } from "@utils/trpc";
import { Shift } from "@models/types";

interface CalendarontextInterface {
  loading: boolean;
  date: moment.Moment | null;
  data: Shift[][];
  selectedDepartment: string | undefined;
  setSelectedDepartment: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  setData: React.Dispatch<React.SetStateAction<Shift[][]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setDate: React.Dispatch<React.SetStateAction<moment.Moment | null>>;
  getData: (day: moment.Moment | null) => void;
}

export const CalendarContext = createContext({} as CalendarontextInterface);

export const CalendarContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { departments } = useContext(BusinessContext);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<moment.Moment | null>(null);
  const [data, setData] = useState<Shift[][]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<
    string | undefined
  >(departments ? departments[0] : undefined);

  const { refetch } = trpc.useQuery(
    [
      "schedule.get-schedule-for-date",
      { date: date ? date.toDate() : null, department: selectedDepartment },
    ],
    {
      enabled: false,
    }
  );

  const getData = useCallback(async () => {
    setLoading(true);
    setTimeout(async () => {
      const { data } = await refetch();
      if (data) {
        setData(data.schedule);
      }
      setLoading(false);
    }, 1000);
  }, [refetch]);

  useEffect(() => {
    if (date) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, selectedDepartment]);

  return (
    <CalendarContext.Provider
      value={{
        loading,
        date,
        data,
        selectedDepartment,
        setSelectedDepartment,
        setData,
        setLoading,
        setDate,
        getData,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
