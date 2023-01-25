import { useContext, useReducer } from "react";
import { BusinessContext, ConstraintContext } from "@contexts/index";
import {
  PlusIcon,
  CheckBadgeIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { trpc } from "@utils/trpc";
import type { Constraint } from "@models/types";

type Props = {
  type: "add" | "edit";
  constraintObject?: Constraint;
  setIsEditing?: React.Dispatch<React.SetStateAction<boolean>>;
};

enum ActionType {
  SET_DAY_OF_WEEK = "SET_DAY_OF_WEEK",
  SET_START = "SET_START",
  SET_END = "SET_END",
  SET_TYPE = "SET_TYPE",
  SET_CONSTRAINT = "SET_CONSTRAINT",
  SET_POSITION = "SET_POSITION",
  SET_DEPARTMENT = "SET_DEPARTMENT",
}

type State = {
  dayOfWeek: number;
  start: string;
  end: string;
  type: "MIN" | "MAX" | "EXACT";
  constraint: number;
  position: string;
  department: string;
  id?: string;
};

interface Action {
  type: ActionType;
  payload: number | string;
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_DAY_OF_WEEK":
      return { ...state, dayOfWeek: action.payload as number };
    case "SET_START":
      return { ...state, start: action.payload as string };
    case "SET_END":
      return { ...state, end: action.payload as string };
    case "SET_TYPE":
      return { ...state, type: action.payload as "MIN" | "MAX" | "EXACT" };
    case "SET_CONSTRAINT":
      return { ...state, constraint: action.payload as number };
    case "SET_POSITION":
      return { ...state, position: action.payload as string };
    case "SET_DEPARTMENT":
      return { ...state, department: action.payload as string };
    default:
      return state;
  }
};

const AddConstraintRow = ({ type, constraintObject, setIsEditing }: Props) => {
  const { openingHours, closingHours, departments, positions } =
    useContext(BusinessContext);
  const { constraints, setConstraints } = useContext(ConstraintContext);

  const { mutate: createConstraint, isLoading: isCreateConstraintLoading } =
    trpc.constraint.createConstraint.useMutation();
  const { mutate: updateConstraint, isLoading: isUpdateConstraintLoading } =
    trpc.constraint.updateConstraint.useMutation();

  const [state, dispatch] = useReducer(
    reducer,
    constraintObject || {
      type: "MIN",
      constraint: 1,
      dayOfWeek: 1,
      start: openingHours[0] || "09:00",
      end: closingHours[0] || "17:00",
      department: departments[0] || "",
      position: positions[0] || "",
    }
  );

  return (
    <tr>
      <td>
        <div className="form-control">
          <select
            value={state.dayOfWeek}
            className="select-bordered select max-w-xs"
            onChange={(e) => {
              dispatch({
                type: ActionType.SET_DAY_OF_WEEK,
                payload: parseInt(e.target.value),
              });
            }}
          >
            <option value={1}>Monday</option>
            <option value={2}>Tuesday</option>
            <option value={3}>Wednesday</option>
            <option value={4}>Thursday</option>
            <option value={5}>Friday</option>
            <option value={6}>Saturday</option>
            <option value={0}>Sunday</option>
          </select>
        </div>
      </td>
      <td className="grid grid-cols-2  gap-x-2">
        <input
          type="time"
          className="input-bordered input"
          value={state.start}
          name="start"
          onChange={(e) => {
            dispatch({
              type: ActionType.SET_START,
              payload: e.target.value,
            });
          }}
        />
        <input
          type="time"
          className="input-bordered input"
          value={state.end}
          name="end"
          onChange={(e) => {
            dispatch({
              type: ActionType.SET_END,
              payload: e.target.value,
            });
          }}
        />
      </td>
      <td>
        <select
          className="select-bordered select max-w-xs"
          value={state.type}
          onChange={(e) => {
            dispatch({
              type: ActionType.SET_TYPE,
              payload: e.target.value,
            });
          }}
        >
          <option value="MIN">Minimum</option>
          <option value="MAX">Maximum</option>
          <option value="EXACT">Exactly</option>
        </select>
        <input
          onChange={(e) => {
            dispatch({
              type: ActionType.SET_CONSTRAINT,
              payload: parseInt(e.target.value),
            });
          }}
          type="number"
          className="input-bordered input ml-2  max-w-[8rem]"
          value={state.constraint}
        />
      </td>
      <td>
        <select
          className="select-bordered select max-w-xs"
          value={state.position}
          onChange={(e) => {
            dispatch({
              type: ActionType.SET_POSITION,
              payload: e.target.value,
            });
          }}
        >
          {positions.map((position) => (
            <option key={position} value={position}>
              {position}
            </option>
          ))}
        </select>
      </td>
      <td>
        <select
          className="select-bordered select max-w-xs"
          value={state.department}
          onChange={(e) => {
            dispatch({
              type: ActionType.SET_DEPARTMENT,
              payload: e.target.value,
            });
          }}
        >
          {departments.map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>
      </td>
      <td className="grid grid-cols-2 gap-2">
        <button
          className={`btn-success btn hover:opacity-80 ${
            type === "add" && "col-span-2"
          }`}
          onClick={() => {
            if (type === "add") {
              createConstraint(state, {
                onSuccess: (data) => {
                  setConstraints([...constraints, data]);
                },
              });
            } else {
              console.log(state);
              updateConstraint(state as Constraint, {
                onSuccess: (data) => {
                  const newConstraints = constraints.map((constraint) => {
                    if (constraint.id === data.id) {
                      return data;
                    }
                    return constraint;
                  });
                  setConstraints(newConstraints);
                  if (setIsEditing) {
                    setIsEditing(false);
                  }
                },
              });
            }
          }}
        >
          {type === "add" ? (
            <PlusIcon className="h-6 w-6 text-white" />
          ) : (
            <CheckBadgeIcon className="h-6 w-6 text-white" />
          )}
        </button>
        {type === "edit" && setIsEditing && (
          <button
            className="btn bg-red-600"
            disabled={isUpdateConstraintLoading || isCreateConstraintLoading}
            onClick={() => setIsEditing(false)}
          >
            <XCircleIcon className="h-6 w-6 text-white" />
          </button>
        )}
      </td>
    </tr>
  );
};

export default AddConstraintRow;
