import {
  getEmployeeAvailabilitiesForDayOfWeek,
  getLongestAvailableTimeForEmployee,
  findConstraintsForTheEmployee,
  getShiftDurationAsMinutes,
  checkIfConstraintsAreSatisfied,
} from "@utils/helpers";
import type { Availability } from "@models/types";
import {
  employee,
  availabilities,
  availabilitiesForDayOfWeek,
  constraints,
  shifts,
} from "@models/constants";

describe("get Employee Availabilities For Day Of Week", () => {
  it("should return the availabilities for the day of week", () => {
    const dayOfWeek = 1;

    const result = getEmployeeAvailabilitiesForDayOfWeek(
      availabilities,
      dayOfWeek
    );

    expect(result.length).toEqual(1);
  });
});

describe("get Longest Available Time For Employee", () => {
  it("should return the longest available time for the employee", () => {
    const result = getLongestAvailableTimeForEmployee(availabilities);

    expect(result.start).toEqual("09:00");
    expect(result.end).toEqual("17:00");
  });
});

describe("find Constraints For The Employee", () => {
  it("should return the constraints for the employee", () => {
    const result = findConstraintsForTheEmployee(
      constraints,
      availabilitiesForDayOfWeek,
      employee,
      1
    );

    expect(result.length).toEqual(2);
  });
});

describe("get Shift Duration As Minutes", () => {
  it("should return the shift duration as minutes", () => {
    const result = getShiftDurationAsMinutes(availabilities[0] as Availability);

    expect(result).toEqual(300);
  });
});

describe("check If Constraints Are Satisfied", () => {
  it("should check if constraints are satisfied and add a isSatisfied property to the constraint", () => {
    const result = checkIfConstraintsAreSatisfied(constraints, shifts);

    console.log(result);
    expect(result[0]?.isSatisfied).toEqual(false);
    expect(result[1]?.isSatisfied).toEqual(false);
  });
});
