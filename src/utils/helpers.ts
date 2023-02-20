import moment from "moment";
import type { Availability, Constraint, Employee, Shift } from "@models/types";

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
  employee: Employee,
  dayOfWeek: number
) => {
  return constraints.filter((constraint) => {
    const isSameDayOfWeek = constraint.dayOfWeek === dayOfWeek;
    const isSameDepartment = constraint.department === employee.department;
    const isSamePosition = constraint.position === employee.position;
    const constraintStart = moment(constraint.start, "HH:mm");
    const constraintEnd = moment(constraint.end, "HH:mm");

    if (!isSameDepartment || !isSamePosition) {
      return false;
    }

    const isConstraintDuringEmployeeAvailabilities =
      employeeAvailabilitiesForDayOfWeek.some((availability) => {
        const availabilityStart = moment(availability.start, "HH:mm");
        const availabilityEnd = moment(availability.end, "HH:mm");

        return (
          availabilityStart.isSameOrAfter(constraintStart) &&
          availabilityEnd.isSameOrBefore(constraintEnd)
        );
      });

    return (
      isSameDepartment &&
      isSamePosition &&
      isConstraintDuringEmployeeAvailabilities &&
      isSameDayOfWeek
    );
  });
};

export const checkIfConstraintsAreSatisfied = (
  constraints: Constraint[],
  shifts: Shift[]
) => {
  return constraints.map((constraint) => {
    let isSatisfied = false;
    let employeeCountDuringConstraint = 0;
    const { type, start, end, dayOfWeek } = constraint;
    const constraintStart = moment(start, "HH:mm");
    const constraintEnd = moment(end, "HH:mm");

    shifts.forEach((shift) => {
      const shiftDayOfWeek = moment(shift.date).day();

      const shiftStart = moment(shift.start, "HH:mm");
      const shiftEnd = moment(shift.end, "HH:mm");

      if (
        shiftDayOfWeek === dayOfWeek &&
        (shiftStart.isBetween(
          constraintStart,
          constraintEnd,
          undefined,
          "[]"
        ) ||
          shiftEnd.isBetween(constraintStart, constraintEnd, undefined, "[]") ||
          constraintStart.isBetween(shiftStart, shiftEnd, undefined, "[]") ||
          constraintEnd.isBetween(shiftStart, shiftEnd, undefined, "[]")) &&
        !shiftEnd.isSame(constraintStart) &&
        !constraintEnd.isSame(shiftStart) &&
        constraint.department === shift.user.department &&
        constraint.position === shift.user.position
      ) {
        employeeCountDuringConstraint++;
      }
    });

    if (type === "EXACT") {
      isSatisfied = employeeCountDuringConstraint === constraint.constraint;
    }

    if (type === "MAX") {
      isSatisfied =
        employeeCountDuringConstraint > 0 &&
        employeeCountDuringConstraint <= constraint.constraint;
    }

    if (type === "MIN") {
      isSatisfied = employeeCountDuringConstraint >= constraint.constraint;
    }

    return {
      ...constraint,
      isSatisfied,
    };
  });
};

export const getLongestAvailableTimeForEmployee = (
  employeeAvailabilitiesForDayOfWeek: Availability[]
) => {
  let longestAvailability =
    employeeAvailabilitiesForDayOfWeek[0] as Availability;

  employeeAvailabilitiesForDayOfWeek.forEach((availability) => {
    const start = moment(availability.start, "HH:mm");
    const end = moment(availability.end, "HH:mm");
    const duration = moment.duration(end.diff(start));

    const longestStart = moment(longestAvailability.start, "HH:mm");
    const longestEnd = moment(longestAvailability.end, "HH:mm");
    const longestDuration = moment.duration(longestEnd.diff(longestStart));

    if (duration > longestDuration) {
      longestAvailability = availability;
    }
  });

  return longestAvailability;
};

export const getShiftDurationAsMinutes = (availability: Availability) => {
  const start = moment(availability.start, "HH:mm");
  const end = moment(availability.end, "HH:mm");
  return moment.duration(end.diff(start)).asMinutes();
};

// export const getAvailableShiftHours = (
//   employeeAvailabilitiesForDayOfWeek: Availability[],
//   constraintsForEmployee: Constraint[]
// ) => {
//   // this function will be used when there are constraints during the employee's availability.
//   // In this case we cannot use the full availability of the employee to create a schedule for the employee.
//   // We need to find the available hours for the employee and then create a schedule for the employee based on the available hours.

//   // we will try to find the longest available time for the employee without ignoring constraints.
//   // if the longest available time is less than the minimum hour required for a shift, we will not create a shift for the employee.

//   const MINIMUM_SHIFT_DURATION = 1; // this is in hours

//   const partialShifts = constraintsForEmployee.map((constraint) => {

// };
