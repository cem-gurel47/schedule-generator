import moment from "moment";
import type { Availability, Constraint, Employee } from "@models/types";

export const getEmployeeAvailabilitiesForDayOfWeek = (
  availabilities: Availability[],
  dayOfWeek: number
) => {
  return availabilities.filter(
    (availability) => availability.dayOfWeek === dayOfWeek
  );
};

export const findConstraintsForTheEmployee = (
  constraints: Constraint[],
  employeeAvailabilitiesForDayOfWeek: Availability[],
  employee: Employee
) => {
  return constraints.filter((constraint) => {
    const isSameDepartment = constraint.department === employee.department;
    const isSamePosition = constraint.position === employee.position;
    const isConstraintDuringEmployeeAvailabilities =
      employeeAvailabilitiesForDayOfWeek.some((availability) => {
        const start = moment(availability.start);
        const end = moment(availability.end);

        const constraintStart = moment(constraint.start);
        const constraintEnd = moment(constraint.end);

        return (
          start.isBetween(constraintStart, constraintEnd, undefined, "[]") ||
          end.isBetween(constraintStart, constraintEnd, undefined, "[]")
        );
      });

    return (
      isSameDepartment &&
      isSamePosition &&
      isConstraintDuringEmployeeAvailabilities
    );
  });
};

export const getLongestAvailableTimeForEmployee = (
  employeeAvailabilitiesForDayOfWeek: Availability[]
) => {
  let longestAvailability =
    employeeAvailabilitiesForDayOfWeek[0] as Availability;

  employeeAvailabilitiesForDayOfWeek.forEach((availability) => {
    const start = moment(availability.start);
    const end = moment(availability.end);
    const duration = moment.duration(end.diff(start));

    const longestStart = moment(longestAvailability.start);
    const longestEnd = moment(longestAvailability.end);
    const longestDuration = moment.duration(longestEnd.diff(longestStart));

    if (duration > longestDuration) {
      longestAvailability = availability;
    }
  });

  return longestAvailability;
};
