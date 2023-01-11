/* eslint-disable @next/next/no-img-element */
import React, { useContext } from "react";
import { BusinessContext } from "@contexts/index";
import type { Employee } from "@models/types";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { trpc } from "@utils/trpc";
import { SuccessAlert } from "@components/alert/index";

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

type Props = {
  employee: Employee;
  state: State;
  dispatch: React.Dispatch<Action>;
};

const EmployeeProfile = ({ employee, state, dispatch }: Props) => {
  const { departments } = useContext(BusinessContext);
  const { mutate, isLoading, data } =
    trpc.employees.updateEmployeePriorityAndDepartment.useMutation();
  const disabled =
    state.department === employee.department &&
    state.position === employee.position &&
    state.priority === employee.priority;

  const updatePriority = () => {
    mutate({
      id: employee.id,
      priority: state.priority,
      department: state.department,
    });
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img
          className="h-48 w-full rounded object-cover"
          src="https://placeimg.com/192/192/people"
          alt={`${employee.name} photo`}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {employee.name}
          {state.department && (
            <div className="badge-secondary badge">{state.department}</div>
          )}
        </h2>
        <p>{employee.email}</p>
        {/* <select
          className="select-bordered select"
          value={state.position}
          onChange={(e) => {
            dispatch({
              type: ActionType.SET_POSITION,
              payload: e.target.value,
            });
          }}
        >
          {positions?.map((position) => (
            <option key={position} value={position}>
              {position}
            </option>
          ))}
        </select> */}
        {departments && (
          <select
            className="select-bordered select"
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
        )}
        <div className="">
          <div className="flex  justify-start gap-1">
            <p className="grow-0">Priority</p>
            <div
              className="tooltip tooltip-right z-10"
              data-tip="Priority will determine how much our algorithm is likely to give a shift to an employee. Higher numbers mean a higher priority."
            >
              <InformationCircleIcon className="h-6 w-6 cursor-pointer" />
            </div>
          </div>
          <div className="mt-2">
            <input
              type="range"
              min={1}
              max={5}
              value={state.priority}
              onChange={(e) => {
                dispatch({
                  type: ActionType.SET_PRIORITY,
                  payload: parseInt(e.target.value),
                });
              }}
              className="range"
              step={1}
            />
            <div className="flex w-full justify-between px-2 text-xs">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
            </div>
          </div>
        </div>
        <div className="">
          <div className="stat-title">Preferred Working Amount:</div>
          <div className="stat-value">{`${employee.minHours} - ${employee.maxHours} hours`}</div>
        </div>
        <div className="card-actions mt-4 justify-end">
          <button
            onClick={updatePriority}
            className={`btn-primary btn ${isLoading && "loading"}`}
            disabled={disabled}
          >
            SAVE CHANGES
          </button>
          {data && (
            <SuccessAlert
              title="Success!"
              description="Changes have been saved."
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
