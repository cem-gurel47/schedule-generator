import Head from "next/head";
import { useReducer, useEffect } from "react";
import { trpc } from "@utils/trpc";
import { useRouter } from "next/router";
import { EmployeeProfileCard } from "@components/card/index";
import { EmployeeAvailabilityTable } from "@components/table/index";
import Calendar from "@components/calendar/employee/EmployeeCalendar";

enum ActionType {
  SET_PRIORITY = "SET_PRIORITY",
  SET_POSITION = "SET_POSITION",
  SET_DEPARTMENT = "SET_DEPARTMENT",
}

interface Action {
  type: ActionType;
  payload: number | string;
}

type State = {
  priority: number;
  position: string;
  department: string;
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionType.SET_PRIORITY:
      return { ...state, priority: action.payload as number };
    case ActionType.SET_POSITION:
      return { ...state, position: action.payload as string };
    case ActionType.SET_DEPARTMENT:
      return { ...state, department: action.payload as string };
    default:
      return state;
  }
};

const EmployeeProfilePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = trpc.employees.getEmployee.useQuery({ id: id as string });
  const [state, dispatch] = useReducer(reducer, {
    priority: 0,
    position: "",
    department: "",
  });

  useEffect(() => {
    if (data) {
      dispatch({ type: ActionType.SET_PRIORITY, payload: data.priority });
      dispatch({ type: ActionType.SET_POSITION, payload: data.position });
      dispatch({ type: ActionType.SET_DEPARTMENT, payload: data.department });
    }
  }, [data]);

  if (!data) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>Employee Page</title>
        <meta name="description" content="Employee profile" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <section className="my-6">
          <div className="grid grid-cols-8 md:gap-4">
            <div className="col-span-6 md:col-span-2 lg:col-span-2">
              <EmployeeProfileCard
                employee={data}
                state={state}
                dispatch={dispatch}
              />
            </div>
            <div className="col-span-6">
              <h2 className=" mb-4 text-2xl">Availability:</h2>
              <EmployeeAvailabilityTable hours={[["12:00", "13:00"]]} />
              <h2 className="mt-4 text-2xl">Schedule:</h2>
              <Calendar type="profile" name={data.name} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default EmployeeProfilePage;
